/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
//import { RootState } from '../../store';
import { CartItem, CartSliceState } from './types';

// export type CartItem = {
//   id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   type: string;
//   size: number;
//   count: number;
// };

// interface CartSliceState {
//   totalPrice: number;
//   totalCount: number;
//   items: CartItem[];
// }

//const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: getCartFromLS(),
  //totalPrice,
  //totalCount,
  //items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //  addItem(state, action) {
    //    state.items.push(action.payload);
    //    state.totalPrice = state.items.reduce((sum, obj) => {
    //      return obj.price + sum;
    //    }, 0);
    //  },
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      // state.totalPrice = state.items.reduce((sum, obj) => {
      //   return obj.price * obj.count + sum;
      // }, 0);
      //state.totalPrice = calcTotalPrice(state.items);
    },
    //  plusItem(state, action) {
    //    const findItem = state.items.find((obj) => obj.id === action.payload);
    //    if (findItem) {
    //      findItem.count++;
    //    }
    //  },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
