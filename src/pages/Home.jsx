import React from 'react'

import Categories from '../components/Categories';
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Card/Skeleton";

import axios from "axios";

function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	React.useEffect(() => {
		setIsLoading(true);
		// fetch('https://63b2b99f5e490925c51fc1ea.mockapi.io/items')
		// .then((res) => res.json())
		// .then((json) => {setItems(json); setIsLoading(false);})
		const axiosItems = async () => {
			const data = await axios('https://63b2b99f5e490925c51fc1ea.mockapi.io/items').then((res) => {setItems(res.data)});
			setIsLoading(false);
		};
		axiosItems();
	}, []);
  return (
	<>
	<div className="content__top">
	<Categories/>
	<Sort/>
 </div>
 <h2 className="content__title">All Pizzas</h2>
 <div className="content__items">
	{isLoading ? [...Array(10)].map((_, index) => 
	<Skeleton key={index}/>)
	: items.map((obj) => (
		<Card
		key={obj.id}
		// title= {obj.title}
		// price= {obj.price}
		// imageUrl= {obj.imageUrl}
		// sizes= {obj.sizes}
		// types= {obj.types}
		{...obj}
		/>
		))} 
 </div>
 </>
  )
}

export default Home;