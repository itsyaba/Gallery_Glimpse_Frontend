import { apiSlice } from "./apiSlices";
import { USER_URL } from "../../lib/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USER_URL + "/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: USER_URL + "/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USER_URL + "/register",
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: USER_URL + "/profile",
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getProfileById: builder.query({
      query: (id) => ({
        url: USER_URL + `/${id}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: USER_URL + "/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: USER_URL + `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileQuery,
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} = userApiSlice;
