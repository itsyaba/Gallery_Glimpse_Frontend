// import { useAppDispatch , useAppSelector } from "@/app/hooks";
import { useGetAllImagesQuery } from "@/app/slices/imageApiSlice";
import { MasonryLayout } from "@/components/MasonryLayout";
import { HashLoader } from "react-spinners";

export const HomePage = () => {
  const { data, isLoading, error } = useGetAllImagesQuery({});

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <HashLoader color="#36d7b7" />
        </div>
      ) : error ? (
        <div className="font-quicksand font-bold text-2xl text-center mt-6">
          Failed to load images . Please try again!{" "}
        </div>
      ) : (
        <MasonryLayout pins={data?.data?.image} />
      )}
    </>
  );
};
