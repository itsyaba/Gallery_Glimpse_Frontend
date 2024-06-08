import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useRegisterMutation } from "../app/slices/usersApiSlice";
import { SetCredentials } from "../app/slices/authSlice";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const RegisterPage = () => {
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(2, { message: "Full name must be more than 2 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await register(values).unwrap();
      dispatch(SetCredentials({ ...res }));
      toast.success("Successfully registered. Redirecting to home page...");
    } catch (error) {
      toast.error((error as { data?: { message?: string }; message?: string }).data?.message || (error as Error).message);
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="h-screen flex items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="John Doe" {...field} required autoComplete="name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="email@example.com" {...field} required autoComplete="email" />
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" placeholder="Password" {...field} required type="password" autoComplete="current-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" placeholder="Confirm Password" {...field} required type="password" autoComplete="current-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="w-6 h-6 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterPage;
