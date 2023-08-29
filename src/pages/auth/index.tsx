import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { toast } from "~/components/ui/use-toast";

type Input = {
  email: string;
};

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const router = useRouter();

  const supabase = useSessionContext().supabaseClient;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (input) => {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOtp({
        email: input.email,
      });
      await router.push("/auth/magic-link-sent");
      toast({
        description: "Magic link sent",
        duration: 1500,
        action: <CheckCircle2 className="text-green-600" />,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <Logo classNames="my-8" />
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">Continue with email</CardTitle>
            <CardDescription>
              {`We'll send you a link sign up or login`}
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
                {isLoading ? "Loading..." : "Send magic link"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
