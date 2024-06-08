import { apiSlice } from "./apiSlices";
import { IMAGE_URL } from "../../lib/constants";

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: () => ({
        url: IMAGE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Image"],
    }),
    getImageById: builder.query({
      query: (id) => ({
        url: `${IMAGE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Image"],
    }),
    getMyPrivateImages : builder.query({
      query: () => ({
        url: `${IMAGE_URL}/myPins`,
        method: "GET",
      }),
      providesTags: ["Image"],
    }) ,
    searchImage: builder.query({
      query: (searchTerm) => ({
        url: `${IMAGE_URL}/search/${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Image"],
    }),
    getImagesByCateGory: builder.query({
      query: (categoryName) => ({
        url: `${IMAGE_URL}/category/${categoryName}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Images", "Image"],
    }),
    getImageCreatedByUserId: builder.query({
      query: (userId) => ({
        url: `${IMAGE_URL}/createdBy/${userId}`,
        method: "GET",
      }),
      providesTags: ["Image"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: IMAGE_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateImage: builder.mutation({
      query: (data) => ({
        url: `${IMAGE_URL}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Image"],
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `${IMAGE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Image"],
    }),
  }),
});

export const {
  useGetAllImagesQuery,
  useGetImageByIdQuery,
  useGetMyPrivateImagesQuery,
  useSearchImageQuery,
  useGetImageCreatedByUserIdQuery,
  useGetImagesByCateGoryQuery,
  useUploadImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = imageApiSlice;
