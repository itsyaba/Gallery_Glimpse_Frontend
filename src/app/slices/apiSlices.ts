import { fetchBaseQuery, createApi, BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../lib/constants";
import {RootState} from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.userInfo?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


async function baseQueryWithAuth(args: string | FetchArgs, api: BaseQueryApi, extra: object) {
  const result = await baseQuery(args, api, extra);
  if (result.error) {
    console.error(result.error);
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Image" , "Category" , "Images"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});
