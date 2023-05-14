import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  imageName: string;
  productName: string;
  price: number;
  discount: number;
  description: string;
}

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface CartState {
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
    remove: (state, action: PayloadAction<number>) => {
      state.products.forEach(function (item, index, object) {
        if (item.product.id === action.payload) {
          if (item.quantity === 1) {
            object.splice(index, 1);
          } else {
            item.quantity--;
          }
        }
      });
    },
    clear: (state) => {
      state.products = [];
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
