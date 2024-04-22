import React from 'react';
import styles from '@/src/utils/style';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3, '이름은 최소 3글자 이상이 필요합니다.'),
  email: z.string().email(),
  password: z.string().min(8, '비밀번호는 최소 8자리 입니다.'),
  phone_number: z.number().min(10, '핸드폰 번호는 최소 10자리 이상입니다.'),
});

type SignupSchema = z.infer<typeof formSchema>;
const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
  });
  const [show, setShow] = useState(false);

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
    reset();
  };
  return (
    <div className="m-2">
      <br />
      <h1 className={`${styles.title}`}>자샘막에 가입하세요!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full relative mb-3">
          <label className={`${styles.label}`}>이름을 입력해 주세요!</label>
          <input
            {...register('name')}
            type="text"
            placeholder="홍길동"
            className={`${styles.input}`}
          />
        </div>
        <label className={`${styles.label}`}>이메일을 입력해 주세요!</label>
        <input
          {...register('email')}
          type="email"
          placeholder="honggildong@example.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <div className="w-full relative mt-3">
          <label className={`${styles.label}`}>
            핸드폰 번호을 입력해 주세요!
          </label>
          <input
            {...register('phone_number')}
            type="number"
            placeholder="010-1111-1111"
            className={`${styles.input}`}
          />
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            비밀번호를 입력해 주세요!
          </label>
          <input
            {...register('password')}
            type={!show ? 'password' : 'text'}
            placeholder="password!@"
            className={`${styles.input}`}
          />
          {errors.password && (
            <span className="text-red-500 block mt-1">
              {`${errors.password.message}`}
            </span>
          )}
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value="회원가입"
            disabled={isSubmitting}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <hr className="bg-[#eaeaea]" />
        <div className="flex items-center justify-center ">
          <FcGoogle size={30} className="cursor-pointer my-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Naum text-[15px]">
          이미 계정이 있으신가요?
          <span
            className="text-[#294ebd] pl-1 cursor-pointer"
            onClick={() => setActiveState('Login')}
          >
            로그인
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;
