import { useSessionContext } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type Input = {
  email: string;
};

export default function Auth() {
  const supabase = useSessionContext().supabaseClient;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  async function signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    return { data, error };
  }

  const onSubmit: SubmitHandler<Input> = async (input) => {
    const { data, error } = await signInWithEmail(input.email);
    return { data, error };
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <Logo classNames="my-4" />
            <CardTitle className="text-xl">Continue with email</CardTitle>
            <CardDescription>
              {`We'll send you a sign up or login link`}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    {...register("email", {
                      required: true,
                      validate: (value) => value.includes("@"),
                    })}
                    id="email"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-600">
                      {errors.email.type === "validate" &&
                        "Please enter a valid email"}
                      {errors.email.type === "required" &&
                        "This field is required"}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex">
              <Button type="submit" className="w-full">
                Send magic link
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
