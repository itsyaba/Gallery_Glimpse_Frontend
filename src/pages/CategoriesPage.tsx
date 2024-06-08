import { useParams } from "react-router-dom";
import { useGetImagesByCateGoryQuery } from "@/app/slices/imageApiSlice";
import { HashLoader } from "react-spinners";
import { MasonryLayout } from "@/components/MasonryLayout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const CategoriesPage = () => {
  const { name } = useParams();
  const { data, isLoading, error, refetch } = useGetImagesByCateGoryQuery(name, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (name) {
      refetch();
    }
  }, [name, refetch , data]);


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <HashLoader color="#36d7b7" />
        </div>
      ) : error ? (
        <div className="font-quicksand font-bold text-2xl text-center mt-6 flex flex-col items-center">
          Failed to load images. Please try again!
          <Button
            className="mt-4 px-4 py-2 "
            onClick={() => {
              console.log("Refetching...");
              refetch();
            }}
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          <MasonryLayout pins={data?.data?.image} />
        </>
      )}
    </>
  );
};
