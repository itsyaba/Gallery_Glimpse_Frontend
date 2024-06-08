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

import { useGetProfileByIdQuery, useUpdateProfileMutation } from "@/app/slices/usersApiSlice";
import { SetCredentials } from "@/app/slices/authSlice";

import {  useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { HashLoader } from "react-spinners";

const ProfilePageEdit = () => {
  // const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetProfileByIdQuery(userInfo.data.user._id);

  useEffect(() => {
    if (userInfo.data.user._id !== userId) {
      navigate("/");
      console.log("not the same");
    }
  }, [userInfo, navigate, userId]);

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (profileData) {
      reset({
        email: profileData.data.user.email,
        name: profileData.data.user.name,
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (profileData.data.user._id === "665cc9ef8891100ae783a5d7") {
      return toast.error("You Can Not Edit Demo Account");
    }
    try {
      const res = await updateProfile(values).unwrap();
      dispatch(SetCredentials({ ...res }));
      toast.success("Profile updated successfully");
      navigate(`/profile/${userId}`);
    } catch (error: unknown) {
      toast.error(
        (error as { data?: { message?: string }; message?: string }).data?.message ||
          (error as Error).message
      );
    }
  };

  return (
    <>
      {profileLoading ? (
        <div className="flex items-center justify-center h-60">
          <HashLoader color="#36d7b7" />
        </div>
      ) : profileError ? (
        <div className="font-quicksand font-bold text-2xl text-center mt-6">
          Failed to load image detail . Please try again!{" "}
        </div>
      ) : (
        <Form {...form}>
          <form
            className="h-full flex items-center justify-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Edit Profile</CardTitle>
                <CardDescription>Update your profile</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          required
                          type="text"
                          autoComplete="name"
                        />
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
                    <ReloadIcon className="w-6 h-6 animate-spin mr-3" />
                    Please wait...
                  </Button>
                ) : (
                  <Button className="w-full" type="submit">
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}
    </>
  );
};

export default ProfilePageEdit;
