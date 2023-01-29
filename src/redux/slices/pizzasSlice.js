/** @format */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { category, search, sortBy, order, currentPage } = params;
  const { data } = await axios.get(
    `https://63b2b99f5e490925c51fc1ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});
const initialState = {
  items: [],
  status: 'loading', // loading \ success \ error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
      console.log('Data is being sent');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      console.log(state, 'All Good');
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
      console.log('Was Error');
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
