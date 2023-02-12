/** @format */

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface PizzasSliceState {
  items: Pizza[];
  status: Status;
  //status: 'loading' | 'success' | 'error';
}

export type SearchPizzaParams = {
  category: string;
  search: string;
  sortBy: string;
  order: string;
  currentPage: string;
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
