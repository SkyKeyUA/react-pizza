/** @format */

import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Pagination from '../components/Pagination';

//import axios from 'axios';
//import { SearchContext } from '../App';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzasData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  //const { searchValue } = React.useContext(SearchContext);
  const { items, status } = useSelector(selectPizzasData);
  //const sortType = sort.sortProperty;
  //   const categoryId = useSelector((state) => state.filterSlice.categoryId);
  //   const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  //const [items, setItems] = React.useState([]);
  //   const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  //const [currentPage, setCurrentPage] = React.useState(1);
  //   const [sortType, setSortType] = React.useState({
  //     name: 'popularity',
  //     sortProperty: 'rating',
  //   });
  const onClickCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);
  const onChagnePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = () => {
    //  setIsLoading(true);
    // fetch('https://63b2b99f5e490925c51fc1ea.mockapi.io/items')
    // .then((res) => res.json())
    // .then((json) => {setItems(json); setIsLoading(false);})
    const axiosItems = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      dispatch(
        fetchPizzas({
          category,
          search,
          sortBy,
          order,
          currentPage: String(currentPage),
        }),
      );
    };
    axiosItems();
    window.scrollTo(0, 0);
  };
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
  // try {
  //   dispatch(
  //     fetchPizzas({
  //       category,
  //       search,
  //       sortBy,
  //       order,
  //       currentPage,
  //     }),
  //   );
  //   //   const { data } = await axios.get(
  //   //     `https://63b2b99f5e490925c51fc1ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  //   //   );
  //   //   setItems(res.data);
  //   //   dispatch(setItems(data));
  //   //   setIsLoading(false);
  // } catch (error) {
  //   //   setIsLoading(false);
  //   console.log(error, 'AxiosError');
  //   alert('Mistake when receiving a pizza');
  // } finally {
  //   //   setIsLoading(false);
  // }
  //     };
  //     axiosItems();
  //     window.scrollTo(0, 0);
  //   };
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
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);
  // If there was a first rendering, then we request pizzas (qs)
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
  //   const filterItems = items.filter((item) =>
  //     item.title.toLowerCase().includes(searchValue.toLowerCase()),
  //   );

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => (
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
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>There was an error 😕</h2>
          <p>Unfortunately, it was not possible to get the pizzas. Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChagnePage} />
    </div>
  );
};

export default Home;
