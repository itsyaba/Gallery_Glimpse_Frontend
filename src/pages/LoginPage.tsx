import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useLoginMutation } from "@/app/slices/usersApiSlice";
import { SetCredentials } from "@/app/slices/authSlice";

import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be more than 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "demoaccount@gmail.com",
      password: "asdfghjkl",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await login(values).unwrap();
      dispatch(SetCredentials({ ...res }));
      toast.success("Logged in successfully");
    } catch (error: unknown) {
      toast.error(
        (error as { data?: { message?: string }; message?: string }).data?.message ||
          (error as Error).message
      );
      
    }
  };

  return (
    <Form {...form}>
      <form
        className="h-screen flex items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      required
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      required
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center flex-col gap-2">
            {isLoading ? (
              <Button disabled className="w-full">
                <ReloadIcon className="w-6 h-6 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            )}

            <div className="mt-4 text-center text-sm">
              Do not have an account?{" "}
              <Link to="/register" className="underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginPage;
