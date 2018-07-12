import axios from 'axios';

export const doSearch = (searchString) => async dispatch => {
  let baseURL;
  if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://www.usenano.org/db?search=';
  } else {
    baseURL = 'http://localhost:5000/db?search=';
  }

  const url = baseURL + searchString;
  const res = await axios.get(url);

  const newSearch = res.data.sort(function(a, b){
    // Sorts the result after 'category'
    var keyA = a.category,
        keyB = b.category;
    if(keyA < keyB){ return -1;}
    else if(keyA > keyB) {return 1;}
    else {return (a.name > b.name) ? 1 : -1}
  });

  dispatch({
    type: "SEARCH",
    payload: {search: newSearch, sort: "category", correctOrder: false}
  });
}

export const doSort = (sort, oldSort, search, correctOrder) => async dispatch => {
  // Sorts alphabetically after sortString which is either 'name', 'category' or 'location' of store.
  // If it was already sorted after that type, (sortString === oldSortString), then reverse the sort.

  const sameSort = sort === oldSort;
  const newCorrectOrder = !sameSort || correctOrder;

  var newSearch = search.concat().sort(function(a, b){
    var keyA, keyB;
    switch(sort){
      case "name":
        keyA = a.name.toLowerCase();
        keyB = b.name.toLowerCase();
        break;
      case "category":
        keyA = a.category;
        keyB = b.category;
        break;
      case "location":
        keyA = a.country;
        keyB = b.country;
        break;
      default:
        keyA = "";
        keyB = keyA;
    }

    // if newCorrectOrder is False, then sort alphabetically
    // Sort reverse alphabetically if newCorrectOrder is True
    const t = newCorrectOrder ? -1 : 1;
    const s = newCorrectOrder ? 1 : -1;

    if(keyA < keyB){ return t;}
    else if(keyA > keyB) {return s;}
    else {return (a.name > b.name) ? t : s}
  });

  dispatch({
    type: "SEARCH",
    payload: {search: newSearch, sort: sort, correctOrder: !newCorrectOrder}
  });
}
