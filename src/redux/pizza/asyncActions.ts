/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './type';

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
