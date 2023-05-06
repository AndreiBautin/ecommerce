import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Product {
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
}

export interface CartProduct {
  product: Product;
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
      if (
        state.products.some((i) => i.product.id == action.payload.product.id)
      ) {
        state.products.forEach(function (obj) {
          if (obj.product.id === action.payload.product.id) {
            obj.quantity += action.payload.quantity;
          }
        });
      } else {
        state.products.push(action.payload);
      }
    },
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
