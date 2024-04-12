import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: '이름은 필수 입니다.' })
  @IsString({ message: '이름은 스트링 타입이여야합니다.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8글자 이상이여야 합니다.' })
  password: string;

  @Field()
  @IsNotEmpty({ message: '이메일은 필수 입니다.' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: '휴대전화 번호은 필수 입니다.' })
  phone_number: number;
}
@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: '이메일은 필수 입니다.' })
  @IsString({ message: '이메일은 스트링 타입이여야합니다.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8글자 이상이여야 합니다.' })
  password: string;
}

@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: '이메일 활성화 토큰은 필수입니다.' })
  activationToken: string;
  @Field()
  @IsNotEmpty({ message: '이메일 활성화 코드는 필수입니다.' })
  activationCode: string;
}
