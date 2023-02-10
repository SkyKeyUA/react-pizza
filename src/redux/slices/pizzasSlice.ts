/** @format */
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Sort } from './filterSlice';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzasSliceState {
  items: Pizza[];
  status: Status;
  //status: 'loading' | 'success' | 'error';
}
const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading \ success \ error
};

// type FetchPizzasArgs = {
//   category: string;
//   search: string;
//   sortBy: string;
//   order: string;
//   currentPage: string;
// };
// type FetchPizzasArgs =
//   Record<string, string>
// ;

export type SearchPizzaParams = {
  category: string;
  search: string;
  sortBy: string;
  order: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  //async (params: Record<string, string>, thunkAPI) => {
  async (params) => {
    const { category, search, sortBy, order, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63b2b99f5e490925c51fc1ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    //return data as Pizza[];
    return data;
    //  if (data.length === 0) {
    //    return thunkAPI.fulfillWithValue('Zero Pizzas');
    //  }
    //  return thunkAPI.fulfillWithValue(data);
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
      console.log('Data is being sent');
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
      console.log('Was Error');
    });
  },

  // this option if you are not using TypeScript

  //   extraReducers: {
  //     [fetchPizzas.pending]: (state) => {
  //       state.status = 'loading';
  //       state.items = [];
  //       console.log('Data is being sent');
  //     },
  //     [fetchPizzas.fulfilled]: (state, action) => {
  //       state.items = action.payload;
  //       state.status = 'success';
  //       console.log(state, 'All Good');
  //     },
  //     [fetchPizzas.rejected]: (state) => {
  //       state.status = 'error';
  //       state.items = [];
  //       console.log('Was Error');
  //     },
  //   },
});

export const selectPizzasData = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
