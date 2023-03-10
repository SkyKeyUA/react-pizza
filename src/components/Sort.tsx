/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types';
//import { selectSort, setSort, Sort, SortPropertyEnum } from '../redux/slices/filterSlice';
//import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};
// export const list: { name: string; sortProperty: string }[] = [
export const list: SortItem[] = [
  { name: 'popularity', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'price (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'price (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'alphabetically (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
  { name: 'alphabetically (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
];

type SortPopupProps = {
  sort: SortType;
};

const Sort: React.FC<SortPopupProps> = React.memo(({ sort }) => {
  const dispatch = useDispatch();
  //const sortType = useSelector(selectSort);
  //const sortRef = React.useRef();
  const sortRef = React.useRef<HTMLDivElement>(null);
  //useWhyDidYouUpdate('SortPopup', { sort });
  const [open, setOpen] = React.useState(false);
  // const sortName = list[selected];
  // const onClickListItem = (i) => {
  // 	setSelected(i);
  // 	setOpen(!open);
  // }
  React.useEffect(() => {
    console.log('Sort mount');
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      console.log('Sort unmount');
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={sortRef}
      onClick={() => setOpen(!open)}
      className={open === true ? 'sort active' : 'sort'}>
      {/* <div className="sort"> */}
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        {/* <span onClick={() => (setOpen(!open))}>{list[selected]}</span> */}
        <span>{sort.name}</span>
      </div>
      <div className="sort__popup">
        <ul>
          {list.map((obj, i) => (
            <li
              key={i}
              onClick={() => dispatch(setSort(obj))}
              className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
              {obj.name}
            </li>
          ))}
          {/* <li className="active">popularity</li>
				  <li>price</li>
				  <li>alphabetically</li>  */}
        </ul>
      </div>
      {/* {open && <div className="sort__popup">
				<ul>
				 {list.map((name, i) => (
				 <li 
				 key={i} 
				 onClick={() => (onClickListItem(i))}
				 className={selected === i ? "active" : ""}>{name}</li>
				 ))}
				 
				  <li className="active">popularity</li>
				  <li>price</li>
				  <li>alphabetically</li> 
				</ul>
			 </div>} */}
    </div>
  );
});

export default Sort;
