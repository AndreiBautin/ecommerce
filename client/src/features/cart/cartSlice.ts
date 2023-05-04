import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface CartProduct {
  id: number;
  imageName: string;
  productName: string;
  cpu: string;
  gpu: string;
  display: string;
  hddssd: string;
  ram: string;
  price: number;
  discount: number;
  quantity: number;
}

interface CartState {
  products: Array<CartProduct>;
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
