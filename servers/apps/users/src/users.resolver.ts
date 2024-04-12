import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  ActivationResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
} from './types/user.types';
import { RegisterDto, ActivationDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('모든 필드를 입력해주세요.');
    }
    const { activation_token } = await this.userService.register(
      registerDto,
      context.res,
    );
    return { activation_token };
  }
  @Mutation(() => ActivationResponse)
  async activationUser(
    @Args('activationDto') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.userService.activateUser(activationDto, context.res);
  }

  @Mutation(() => LoginResponse)
  async Login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    return await this.userService.login({ email, password });
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInUser(@Context() context: { req: Request }) {
    return await this.userService.getLoggedInUser(context.req);
  }

  @Query(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async LogOutUser(@Context() context: { req: Request }) {
    return await this.userService.logOut(context.req);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
