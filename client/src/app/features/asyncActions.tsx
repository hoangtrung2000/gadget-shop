import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory } from "../../apis/app";

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: CategoryResponse }
>("app/categories", async (data, { rejectWithValue }) => {
  const response = await getCategory();
  if (!response.success) return rejectWithValue(response);
  return response.results;
});
