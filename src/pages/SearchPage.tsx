// import React from 'react'
import { useParams } from "react-router-dom";
import { useSearchImageQuery } from "@/app/slices/imageApiSlice";
import { HashLoader } from "react-spinners";
import { MasonryLayout } from "@/components/MasonryLayout";

export const SearchPage = () => {
  const { searchTerm } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error} = useSearchImageQuery(searchTerm);

  console.log(data);

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
