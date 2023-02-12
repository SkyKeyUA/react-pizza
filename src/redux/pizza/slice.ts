/** @format */
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, PizzasSliceState, SearchPizzaParams, Status } from './type';
import { fetchPizzas } from './asyncActions';

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading \ success \ error
};

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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
