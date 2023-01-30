/** @format */

import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
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
    </div>
  );
};

export default FullPizza;
