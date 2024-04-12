import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { LoginDto, RegisterDto, ActivationDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.Service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { TokenSender } from './utils/sendToken';

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}
@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  //유저 회원가입.
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;
    const IsEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (IsEmailExist) {
      throw new BadRequestException('이미 존재하는 유저 입니다.');
    }

    const isPhoneNumberExist = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    const hashPassword = await bcrypt.hash(password, 10);

    if (isPhoneNumberExist) {
      throw new BadRequestException('이미 존재하는 휴대전화 번호입니다.');
    }
    const user = {
      name,
      email,
      password: hashPassword,
      phone_number,
    };
    const activationToken = await this.createActiveToken(user);

    const activationCode = activationToken.activationCode;

    const activation_token = activationToken.token;
    await this.emailService.sendMail({
      email,
      subject: '이메일 계정을 활성화 하세요!',
      template: './activation-mail',
      name,
      activationCode,
    });

    return { activation_token, response };
  }
  //유저 엑티브 토큰 생성
  async createActiveToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );
    return { token, activationCode };
  }

  //유저 활성화!
  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationCode, activationToken } = activationDto;
    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('이메일 활성화 코드가 유효하지않습니다.');
    }

    const { name, email, password, phone_number } = newUser.user;

    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new BadRequestException('이미 존재하는 유저입니다.');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });

    return { user, response };
  }

  //유저 로그인
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await this.comparePassword(password, user.password))) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);

      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: '비밀번호가 올바르지않습니다.',
        },
      };
    }
  }

  //유저 비밀번호 검증
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // 로그인한 유저 정보 가져오기
  async getLoggedInUser(req: any) {
    const user = req.user;
    const refreshToken = req.refreshToken;
    const accessToken = req.accessToken;
    return { user, accessToken, refreshToken };
  }

  //로그아웃
  async logOut(req: any) {
    req.user = null;
    req.refreshtoken = null;
    req.accesstoken = null;
    return { message: '로그아웃 되었습니다.' };
  }
  //유저 서비스 가져오기
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
