"use client";

import { ACheckbox } from "@/components/form/ACheckbox";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { loginSchema, TLogin } from "@/validations/auth.validation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const onSubmit = (data: TLogin) => {
    router.push("/dashboard");
    console.log(data);
  };

  return (
    <main className="flex justify-center items-center h-[80vh]">
      <div className="w-[500px] bg-card rounded-2xl">
        <div className="my-8 text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to TaskFlow</h1>
          <p className="text-card-foreground text-sm">
            Please enter your email and password to login
          </p>
        </div>

        <AForm
          schema={loginSchema}
          defaultValues={{
            email: "junayednoman05@gmail.com",
            password: "newpass",
          }}
          onSubmit={onSubmit}>
          <AInput name="email" label="Email address" type="email" required />
          <AInput name="password" label="Password" type="password" required />

          <div className="flex items-center justify-between">
            <ACheckbox label="Remember password" name="rememberPassword" />
            <div className="text-right">
              <Link href={"/auth/login"}>
                <Button
                  type="button"
                  variant="link"
                  className="text-primary p-0 h-auto font-normal">
                  Forgot Password
                </Button>
              </Link>
            </div>
          </div>

          <Button type="submit" className="h-12 w-full">
            Login
          </Button>
          <p className="text-sm text-center mt-4">
            Do not have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary font-medium">
              Sign Up
            </Link>
          </p>
        </AForm>
      </div>
    </main>
  );
};

export default Login;
