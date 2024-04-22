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
  email: z.string().email('이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자리 입니다.'),
});

type LoginSchema = z.infer<typeof formSchema>;
const Login = ({ setActiveState }: { setActiveState: (e: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });
  const [show, setShow] = useState(false);

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };
  return (
    <div className="m-2">
      <br />
      <h1 className={`${styles.title}`}>자샘막에 로그인하세요!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.password && (
          <span className="text-red-500 block mt-1">
            {`${errors.password.message}`}
          </span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label}  text-[#294ebd] block text-right cursor-pointer`}
          >
            비밀번호 찾기
          </span>
          <input
            type="submit"
            value="로그인"
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
          계정이 없으신가요?
          <span
            className="text-[#294ebd] pl-1 cursor-pointer"
            onClick={() => setActiveState('Signup')}
          >
            회원가입
          </span>
        </h5>
        <h5 className="text-center pt-4 font-Naum text-[15px]">
          <span className="text-center pt-4 font-Naum text-[15px] text-white">
            Demo Account
            <p>demo@example.com</p>
            <p>demo123123</p>
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
