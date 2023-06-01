import axiosClient from "./axios/axiosClient";

export const getCategory = (): Promise<CategoryResponse> =>
  axiosClient({
    url: "/productCategory",
    method: "get",
  });

export const getProducts = (params: any): Promise<ProductResponse> =>
  axiosClient({
    url: "/product",
    method: "get",
    params,
  });
