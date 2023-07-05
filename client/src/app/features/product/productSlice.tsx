import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from "../asyncActions";
import { RootState } from "../../store";

interface InitialState {
  newProducts: Product[] | undefined;
  isLoading: boolean;
  message?: string;
}

const initialState: InitialState = {
  newProducts: undefined,
  isLoading: false,
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.error.message;
    });
  },
});

// export const {} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNewProducts = (state: RootState) =>
  state.product.newProducts;

export default productSlice.reducer;
