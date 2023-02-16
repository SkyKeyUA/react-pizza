/** @format */

import axios from 'axios';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63b2b99f5e490925c51fc1ea.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Mistake when receiving data a pizza');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <div className="container container__pizza">Loading...</div>;
  }
  return (
    <div className="container container__pizza">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>from {pizza.price} $</h4>
      <div className="cart__bottom-buttons">
        <Link to="/react-pizza" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </svg>

          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
