import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetProfileByIdQuery } from "@/app/slices/usersApiSlice";
import {
  useGetImageCreatedByUserIdQuery,
  useGetMyPrivateImagesQuery,
} from "@/app/slices/imageApiSlice";

import { useLogoutMutation , useDeleteUserMutation } from "@/app/slices/usersApiSlice";

import {logout} from "@/app/slices/authSlice";

import { AvatarWithFallback } from "@/components/AvatarWithFallback";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";


import { HashLoader } from "react-spinners";
import { MasonryLayout } from "@/components/MasonryLayout";

import { LogOut, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { data: profileData  } = useGetProfileByIdQuery(userId);
  const {
    data: imagesData,
    isLoading: imageLoading,
    error,
  } = useGetImageCreatedByUserIdQuery(userId);

  const {
    data: myImagesData,
    isLoading: myImageLoading,
    error: myImageError,
  } = useGetMyPrivateImagesQuery({});

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetProfileByIdQuery(userId);

const [logoutApiCall] = useLogoutMutation();  
const [deleteUserApiCall] = useDeleteUserMutation();

  useEffect(() => {
    if (userInfo.data.user._id === userId) {
      setIsMyProfile(true);
    }
  }, [userId, userInfo.data.user._id]);

const deleteProfileHandler = async() => {
  if(userId === "665cc9ef8891100ae783a5d7"){
    return toast.error("You cannot delete Demo Account")
  }
  try {
    await deleteUserApiCall(userId);
    dispatch(logout(null))
  } catch (error) {
    console.log(error)
  }
}

  const logoutHandler = async () => {
    console.log("Logout From Profile");
    try {
      await logoutApiCall(null);
      dispatch(logout(null));
      toast.success("Logged Out Successfully");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <>
      {imageLoading && userLoading && myImageLoading ? (
        <div className="flex items-center justify-center h-60">
          <HashLoader color="#36d7b7" />
        </div>
      ) : error && userError && myImageError ? (
        <div className="font-quicksand font-bold text-2xl text-center mt-6">
          Failed to load images . Please try again!{" "}
        </div>
      ) : (
        <>
          <div className="">
            <div className="relative">
              <div className=" bg-slate-800 min-h-32 w-full rounded-md animation-pulse">
                <img src="https://picsum.photos/1600/300" alt="" className="rounded-md" />
              </div>
              <div className="absolute top-full left-1/2  transform -translate-x-1/2 -translate-y-1/2">
                <div className="scale-150 border-white border-4 rounded-full  flex items-center justify-center">
                  <AvatarWithFallback />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-14 flex-col gap-8">
              <div className="">
                <div className="flex flex-col gap-2 items-center">
                  <h1 className="tracking-wider font-extrabold text-4xl text-center m-auto">
                    {userData?.data?.user?.name.toUpperCase()}
                  </h1>
                  <p className="opacity-45 font-quicksand tracking-wider">
                    {userData?.data?.user?.email}
                  </p>
                </div>
                {isMyProfile && (
                  <div className="flex gap-4 mt-3 flex-col md:flex-row items-center justify-center">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/profile/" + userId + "/edit")}
                    >
                      <Pencil className="w-4 h-4 mr-3" />
                      Edit Profile
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="outline">
                          <LogOut className="w-4 h-4 mr-3" />
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to logout?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={logoutHandler}>Logout</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-3" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={deleteProfileHandler}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>

              <Tabs defaultValue="created" className="w-full text-center">
                <TabsList>
                  <TabsTrigger value="created">Created</TabsTrigger>
                  {isMyProfile && <TabsTrigger value="myPins">My Pins</TabsTrigger>}
                </TabsList>
                <TabsContent value="created">
                  <div className="pb-4"></div>
                  <MasonryLayout pins={imagesData?.data?.image} />
                </TabsContent>
                <TabsContent value="myPins">
                  <div className="pb-4"></div>
                  <MasonryLayout pins={myImagesData?.data?.image} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </>
  );
};
