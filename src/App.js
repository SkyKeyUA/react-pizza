import React from "react";

import './scss/app.scss';

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Card from "./components/Card";

import axios from "axios";

function App() {
	const [items, setItems] = React.useState([]);
	React.useEffect(() => {
		try {
		fetch('https://63b2b99f5e490925c51fc1ea.mockapi.io/items')
		.then((res) => res.json())
		.then((json) => {
			setItems(json);
		});
		//axios.get('https://63b2b99f5e490925c51fc1ea.mockapi.io/items').then((res) => {return setItems(res.data)})
		} catch (error) {
			alert('error when get items')
			console.error(error);
		}
	}, []);
	return (
		<div className="wrapper">
			<Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
				<Categories/>
				<Sort/>
          </div>
          <h2 className="content__title">All Pizzas</h2>
          <div className="content__items">
				{items.map((obj) => (<Card
				key={obj.id}
				{...obj}
				/>))}
          </div>
        </div>
      </div>
    </div>
	);
}

export default App;
