"use client";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { signupSchema, TSignUp } from "@/validations/auth.validation";
import Link from "next/link";
import handleMutation from "@/utils/handleMutation";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/redux/api/authApi";

const SignUp = () => {
  const [signup, { isLoading }] = useSignUpMutation();
  const router = useRouter();

  const onSuccess = () => {
    router.push("/auth/login");
  };

  const onSubmit = async (data: TSignUp) => {
    await handleMutation(data, signup, "Creating account...", onSuccess);
  };

  return (
    <main className="flex justify-center items-center h-[90vh]">
      <div className="w-[550px]! bg-card rounded-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Join TaskFlow Today</h1>
          <p className="text-card-foreground text-sm">
            Create your account to manage projects, <br /> teams, and tasks
            effortlessly
          </p>
        </div>

        <AForm
          schema={signupSchema}
          defaultValues={{
            name: "",
            email: "",
            password: "",
          }}
          className="space-y-3!"
          onSubmit={onSubmit}
        >
          <AInput name="name" label="Full Name" type="text" required />
          <AInput name="email" label="Email Address" type="email" required />
          <AInput name="password" label="Password" type="password" required />

          <Button
            disabled={isLoading}
            type="submit"
            className="h-11 w-full mt-4"
          >
            {isLoading ? "Creating..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </AForm>
      </div>
    </main>
  );
};

export default SignUp;
