import axios from 'axios';

const baseURL = 'https://www.usenano.org/db?search=';

export const doSearch = (searchString) => async dispatch => {
  const url = baseURL + searchString;
  const res = await axios.get(url);

  const newSearch = res.data.sort(function(a, b){
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

export const doSort = (sortString, oldSortString, search, correctOrder) => async dispatch => {
  const sameSort = sortString === oldSortString;
  const newCorrectOrder = !sameSort || correctOrder;

  var newSearch = search.concat().sort(function(a, b){
    var keyA, keyB;
    switch(sortString){
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
    // Compare the 2 dates
    const t = newCorrectOrder ? -1 : 1;
    const s = newCorrectOrder ? 1 : -1;

    if(keyA < keyB){ return t;}
    else if(keyA > keyB) {return s;}
    else {return (a.name > b.name) ? t : s}
  });
  dispatch({
    type: "SEARCH",
    payload: {search: newSearch, sort: sortString, correctOrder: !newCorrectOrder}
  });
}
