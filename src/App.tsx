/** @format */
import Loadable from 'react-loadable';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
//import Cart from './pages/Cart';
//import NotFound from './pages/NotFound';
//import FullPizza from './pages/FullPizza';
// import Header from './components/Header';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

// Can only do on the browser (client)
//const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

// Can do both on the client and the server
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div className="container container__pizza">Loading...</div>,
});

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

// export const SearchContext = React.createContext();

function App() {
  //   const [searchValue, setSearchValue] = React.useState('');
  return (
    //  <div className="wrapper">
    //    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    //    <Header />
    //    <div className="content">
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/react-pizza" element={<Home />} />
        <Route path="/react-pizza/cart" element={<Cart />} />
        <Route
          path="/react-pizza/pizza/:id"
          element={
            <React.Suspense fallback={<div className="container container__pizza">Loading...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div className="container container__pizza">Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
    //</div>
    //</SearchContext.Provider>
    //</div>
  );
}

export default App;
