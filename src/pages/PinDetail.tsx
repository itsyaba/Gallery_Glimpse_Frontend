import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useGetImageByIdQuery } from "@/app/slices/imageApiSlice";
import { useGetImagesByCateGoryQuery } from "@/app/slices/imageApiSlice";
import { useDeleteImageMutation } from "@/app/slices/imageApiSlice";
import { useGetProfileByIdQuery } from "@/app/slices/usersApiSlice";

import { useAppSelector } from "@/app/hooks";

import { HashLoader } from "react-spinners";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

import { Pencil, Trash2 } from "lucide-react";

import { MasonryLayout } from "@/components/MasonryLayout";
import { toast } from "react-toastify";

export const PinDetail = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [isCreatedByCurrentUser, setIsCreatedByCurrentUser] = useState(false);

  const { pinId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch: refetchImage } = useGetImageByIdQuery(pinId);

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetProfileByIdQuery(data?.data?.image.createdBy, { skip: !data?.data?.image.createdBy });

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetImagesByCateGoryQuery(data?.data?.image.categories, {
    skip: !data?.data?.image.categories,
  });

  const [deleteImage] = useDeleteImageMutation();

  // console.log(data.data.image.categories);
  // console.log(categoryData.data.image);

  useEffect(() => {
    if (!isLoading) {
      if (data?.data?.image?.createdBy === userInfo.data.user._id) {
        setIsCreatedByCurrentUser(true);
        // console.log(data.data.image.createdBy);
      }
    }
  }, [userInfo, data, isLoading, isProfileLoading, isCreatedByCurrentUser, categoryLoading]);

  const refetchAll = () => {
    console.log("Refetching....");
    refetchImage();
    refetchProfile();
    refetchCategory();
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteImage(pinId);
      console.log("Res : " + res);
      navigate("/");
      toast.success("Image Deleted Successfully");
    } catch (error) {
      toast.error("Error While Deleting Image");
    }
  };

  return (
    <>
      {isLoading || isProfileLoading || categoryLoading ? (
        <div className="flex items-center justify-center h-60">
          <HashLoader color="#36d7b7" />
        </div>
      ) : error || categoryError ? (
        <div className="font-quicksand font-bold text-2xl text-center mt-6">
          Failed to load image detail . Please try again!{" "}
        </div>
      ) : (
        <div className="">
          <div className="flex justify-center h-5/6 w-3/4 p-4 m-auto">
            <div className="w-auto h-full flex flex-col justify-start items-start">
              <img
                src={`http://localhost:3000/Images/${data.data.image.image}`}
                alt={data.data.image.title}
                className="w-80 object-scale-down rounded-2xl"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h2 className="text-4xl font-bold mb-2 font-quicksand  capitalize ">
                {data.data.image.title}
              </h2>
              <p className="text-gray-700 mb-4">{data.data.image.description}</p>
              <div className="">
                <div className="flex items-center mb-4">
                  <Avatar className="w-10 h-10 rounded-full mr-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>TC </AvatarFallback>
                  </Avatar>
                  <div className="group cursor-pointer">
                    <Link to={`/profile/${profileData?.data?.user._id}`}>
                      <p className="font-semibold group-hover:underline transition-all">
                        {profileData?.data?.user.name}
                      </p>
                    </Link>
                    <p className="text-gray-500 text-sm">{profileData?.data?.user.email}</p>
                  </div>
                </div>
                {isCreatedByCurrentUser && (
                  <div className="flex gap-4 mt-3 flex-col md:flex-row">
                    <Button variant="outline" onClick={() => navigate("/pin/" + pinId + "/edit")}>
                      <Pencil className="w-4 h-4 mr-3" />
                      Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-3" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your pin.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={deleteHandler}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10 flex-col gap-4">
            <h1 className=" text-3xl font-quicksand font-semibold underline">Similar Images</h1>
            <div className="">
              {/* {profileData.data.data} */}
              <div onClick={refetchAll}>
                <MasonryLayout pins={categoryData?.data?.image} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
