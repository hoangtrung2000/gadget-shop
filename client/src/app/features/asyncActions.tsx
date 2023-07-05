import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory, getProducts } from "../../apis/app";

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: CategoryResponse }
>("app/categories", async (data, { rejectWithValue }) => {
  const response = await getCategory();
  if (!response.success) return rejectWithValue(response);
  return response.results;
});

export const getNewProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: ProductResponse }
>("product/newProduct", async (data, { rejectWithValue }) => {
  const response = await getProducts({ sort: "-createdAt" });
  if (!response.success) return rejectWithValue(response);
  return response.results;
});
