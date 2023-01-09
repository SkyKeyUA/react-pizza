/** @format */

import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Pagination from '../components/Pagination';

import axios from 'axios';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'popularity',
    sortProperty: 'rating',
  });
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  console.log(categoryId);
  React.useEffect(() => {
    setIsLoading(true);
    // fetch('https://63b2b99f5e490925c51fc1ea.mockapi.io/items')
    // .then((res) => res.json())
    // .then((json) => {setItems(json); setIsLoading(false);})
    const axiosItems = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      const sortBy = sortType.sortProperty.replace('-', '');
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const data = await axios(
        `https://63b2b99f5e490925c51fc1ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      ).then((res) => {
        setItems(res.data);
      });
      setIsLoading(false);
    };
    axiosItems();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  //   const filterItems = items.filter((item) =>
  //     item.title.toLowerCase().includes(searchValue.toLowerCase()),
  //   );
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => (
    <Card
      key={obj.id}
      // title= {obj.title}
      // price= {obj.price}
      // imageUrl= {obj.imageUrl}
      // sizes= {obj.sizes}
      // types= {obj.types}
      {...obj}
    />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort sortType={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
