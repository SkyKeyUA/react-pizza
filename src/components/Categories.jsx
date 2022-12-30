import React from 'react'
function Categories() {
	const [ activeIndex, setActiveIndex	] = React.useState(0);
	const categories = [
		"All",
		"Meat",
		"Vegetarian",
		"Grilled",
		"Pepperoni",
		"Closed",
	]
	const onClickCategory = (index) => {
		setActiveIndex(index)
	}
	return (
		<div className="categories">
		<ul>
			{categories.map((value, i) => 
			(<li key={i} onClick={() => 
			onClickCategory(i)} className={activeIndex === i ? "active" : ""}>{value}</li>))}
		  {/* <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? "active" : ""}>All</li>
		  <li onClick={() => onClickCategory(1)} className={activeIndex === 1 ? "active" : ""}>Meat</li>
		  <li onClick={() => onClickCategory(2)} className={activeIndex === 2 ? "active" : ""}>Vegetarian</li>
		  <li onClick={() => onClickCategory(3)} className={activeIndex === 3 ? "active" : ""}>Grilled</li>
		  <li onClick={() => onClickCategory(4)} className={activeIndex === 4 ? "active" : ""}>Pepperoni</li>
		  <li onClick={() => onClickCategory(5)} className={activeIndex === 5 ? "active" : ""}>Closed</li> */}
		</ul>
	 </div>
	);
}

export default Categories;