/** @format */

import React from 'react';
//import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  categoryId: number;
  // my function does not require any value to be returned
  onClickCategory: (i: number) => void;
};
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickCategory }) => {
    //useWhyDidYouUpdate('Categories', { categoryId, onClickCategory });
    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Pepperoni', 'Closed'];
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={categoryId === i ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
          {/* <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? "active" : ""}>All</li>
				<li onClick={() => onClickCategory(1)} className={activeIndex === 1 ? "active" : ""}>Meat</li>
				<li onClick={() => onClickCategory(2)} className={activeIndex === 2 ? "active" : ""}>Vegetarian</li>
				<li onClick={() => onClickCategory(3)} className={activeIndex === 3 ? "active" : ""}>Grilled</li>
				<li onClick={() => onClickCategory(4)} className={activeIndex === 4 ? "active" : ""}>Pepperoni</li>
				<li onClick={() => onClickCategory(5)} className={activeIndex === 5 ? "active" : ""}>Closed</li> */}
        </ul>
      </div>
    );
  },
);
