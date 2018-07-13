import axios from 'axios';
import Sort from './sort';

export const doSearch = (searchString) => async dispatch => {
  // Get's the data from the back end server. Right now, we have
  // a call to the back end server every time we write a new letter
  // in the search field

  let baseURL;
  if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://www.usenano.org/db?search=';
  } else {
    baseURL = 'http://localhost:5000/db?search=';
  }

  const url = baseURL + searchString;
  const res = await axios.get(url);

  //Sort the data after 'category'
  const newSearch = Sort(res.data, true, "category");

  dispatch({
    type: "SEARCH",
    payload: {search: newSearch, sort: "category", correctOrder: false}
  });
}

export const doSort = (sort, oldSort, searchData, correctOrder) => async dispatch => {
  // Sorts alphabetically after sortString which is either 'name', 'category' or 'location' of store.
  // If it was already sorted after that type, (sortString === oldSortString), then reverse the sort.

  const sameSort = sort === oldSort;
  const newCorrectOrder = !sameSort || correctOrder;

  //Sort the data after 'sort' (category, location, name of store)
  const newSearch = Sort(searchData, newCorrectOrder, sort);

  dispatch({
    type: "SEARCH",
    payload: {search: newSearch, sort: sort, correctOrder: !newCorrectOrder}
  });
}
