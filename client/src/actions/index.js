import axios from 'axios';

const baseURL = location.protocol + '//' + location.host + '/db?search=';

export const doSearch = (searchString) => async dispatch => {
  const url = baseURL + searchString + "&page=1";
  const res = await axios.get(url);

  dispatch({
    type: "SEARCH",
    payload: res.data
  });
}
