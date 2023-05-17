import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../asyncActions";
import { RootState } from "../../store";

interface InitialState {
  categories: Category[] | undefined;
  isLoading: boolean;
}

const initialState: InitialState = {
  categories: undefined,
  isLoading: false,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    log: (state) => {
      console.log(state.isLoading);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload?.results;
    });
  },
});

export const { log } = categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
