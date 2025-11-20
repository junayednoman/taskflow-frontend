"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

const Login = () => {
  return (
    <main className="flex justify-center items-center h-[80vh]">
      <div className="w-[490px] bg-card rounded-2xl">
        <div className="my-8 text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to TaskFlow</h1>
          <p className="text-card-foreground text-sm">
            Please enter your email and password to login
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
