export const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD;
export const IMAGE_URL = "/api/images";
export const USER_URL = "/api/users";
