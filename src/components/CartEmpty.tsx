/** @format */
import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is Empty 😕</h2>
      <p>
        You probably haven't ordered a pizza yet.
        <br />
        To order a pizza, go to the home page.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Return to back</span>
      </Link>
    </div>
  );
};
