import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICart, ICartItem } from "../state/cartState";
import type { RootState } from "../store";

const initialState: ICart = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      
      if (!existingItem) {
        return;
      }

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const cartState = (state: RootState) => state.cartSlice;
export default cartSlice.reducer;
