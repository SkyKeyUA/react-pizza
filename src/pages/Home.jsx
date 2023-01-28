/** @format */

import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Pagination from '../components/Pagination';

import axios from 'axios';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filterSlice);
  //const sortType = sort.sortProperty;
  //   const categoryId = useSelector((state) => state.filterSlice.categoryId);
  //   const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  //const [currentPage, setCurrentPage] = React.useState(1);
  //   const [sortType, setSortType] = React.useState({
  //     name: 'popularity',
  //     sortProperty: 'rating',
  //   });
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChagnePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    setIsLoading(true);
    // fetch('https://63b2b99f5e490925c51fc1ea.mockapi.io/items')
    // .then((res) => res.json())
    // .then((json) => {setItems(json); setIsLoading(false);})
    const axiosItems = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      //    await axios
      //      .get(
      //        `https://63b2b99f5e490925c51fc1ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      //      )
      //      .then((res) => {
      //        setItems(res.data);
      //        setIsLoading(false);
      //      })
      //      .catch((err) => {
      //        console.log(err, 'AxiosError');
      //        setIsLoading(false);
      //      });
      //  };
      try {
        const res = await axios.get(
          `https://63b2b99f5e490925c51fc1ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        setItems(res.data);
        //   setIsLoading(false);
      } catch (error) {
        //   setIsLoading(false);
        console.log(error, 'AxiosError');
        alert('Mistake when receiving a pizza');
      } finally {
        setIsLoading(false);
      }
    };
    axiosItems();
    window.scrollTo(0, 0);
  };
  // If the parameters were changed and the first rendering was (qs)
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);
  // after the first rendering, we check the URL parameters and save Redux (qs)
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);
  // If there was a first rendering, then we request pizzas (qs)
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
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
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChagnePage} />
    </div>
  );
}

export default Home;
