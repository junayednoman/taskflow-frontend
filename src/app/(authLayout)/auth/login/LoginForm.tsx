"use client";
import { ACheckbox } from "@/components/form/ACheckbox";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/slice/authSlice";
import handleMutation from "@/utils/handleMutation";
import { loginSchema, TLogin } from "@/validations/auth.validation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const onSuccess = (res: any) => {
    const decodedUser = jwtDecode(res.data.accessToken);
    dispatch(setUser({ user: decodedUser, token: res.data.accessToken }));
    router.push(redirectUrl);
  };

  const router = useRouter();
  const onSubmit = async (data: TLogin) => {
    await handleMutation(data, login, "Logging in...", onSuccess);
  };
  return (
    <AForm
      schema={loginSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      <AInput name="email" label="Email" type="email" required />
      <AInput name="password" label="Password" type="password" required />

      <div className="flex items-center justify-between">
        <ACheckbox label="Remember password" name="rememberPassword" />
        <div className="text-right">
          <Link href={"/auth/login"}>
            <Button
              type="button"
              variant="link"
              className="text-primary p-0 h-auto font-normal"
            >
              Forgot Password
            </Button>
          </Link>
        </div>
      </div>

      <Button disabled={isLoading} type="submit" className="h-11 w-full">
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <p className="text-sm text-center mt-4">
        Do not have an account?{" "}
        <Link href="/auth/sign-up" className="text-primary font-medium">
          Sign Up
        </Link>
      </p>
    </AForm>
  );
};

export default LoginForm;
