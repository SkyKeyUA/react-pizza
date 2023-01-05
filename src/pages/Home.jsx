import React from 'react'

import Categories from '../components/Categories';
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Card/Skeleton";

import axios from "axios";

function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'popularity',
		sortProperty: 'rating',
	});
	React.useEffect(() => {
		setIsLoading(true);
		// fetch('https://63b2b99f5e490925c51fc1ea.mockapi.io/items')
		// .then((res) => res.json())
		// .then((json) => {setItems(json); setIsLoading(false);})
		const axiosItems = async () => {
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const sortBy = sortType.sortProperty.replace('-', '');
			const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
			const data = await axios(`https://63b2b99f5e490925c51fc1ea.mockapi.io/items?${
				category
				}&sortBy=${sortBy}&order=${order}`)
				.then((res) => { setItems(res.data) });
			setIsLoading(false);
		};
		axiosItems();
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);
	return (
		<div className="container">
			<div className="content__top">
				<Categories
					categoryId={categoryId}
					onClickCategory={(i) => setCategoryId(i)}
				/>
				<Sort
					sortType={sortType}
					onClickSort={(i) => setSortType(i)}
				/>
			</div>
			<h2 className="content__title">All Pizzas</h2>
			<div className="content__items">
				{isLoading ? [...Array(12)].map((_, index) =>
					<Skeleton key={index} />)
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
		</div>
	)
}

export default Home;