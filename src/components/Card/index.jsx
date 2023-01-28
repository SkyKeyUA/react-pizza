/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
function Card({ id, title, price, imageUrl, sizes, types }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartSlice.items.find((obj) => obj.id === id));
  //const [pizzaCount, setPizzaCount] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ['thin', 'traditional'];
  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      //type: activeType,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
    //setPizzaCount((prev) => prev + 1);
  };
  //   const onClickAddPizza = () => {
  //     setPizzaCount((prev) => prev + 1);
  //   };
  // const onClickType = (index) => {
  // 	setActiveType(index);
  // }
  // const onCLickSize = (index) => {
  // 	setActiveSize(index);
  // }
  return (
    <div className="pizza-card__wrapper">
      <div className="pizza-card">
        <img className="pizza-card__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-card__title">{title}</h4>
        <div className="pizza-card__selector">
          <ul>
            {types.map((typeId, i) => (
              <li
                key={i}
                onClick={() => setActiveType(i)}
                className={activeType === i ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
            {/* <li className="active">thin</li>
			 <li>traditional</li> */}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {size} cm.
              </li>
            ))}
            {/* <li className="active">26 cm.</li>
			 <li>30 cm.</li>
			 <li>40 cm.</li> */}
          </ul>
        </div>
        <div className="pizza-card__bottom">
          <div className="pizza-card__price">from {price} $</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>{' '}
    </div>
  );
}

export default Card;
