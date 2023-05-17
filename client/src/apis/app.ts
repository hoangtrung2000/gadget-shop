import axiosClient from "./axios/axiosClient";

export const getCategory = (): Promise<CategoryResponse> =>
  axiosClient({
    url: "/productCategory",
    method: "get",
  });
