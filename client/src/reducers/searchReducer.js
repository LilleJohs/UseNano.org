export default function(state = {search: [], sort: "category", correctOrder: true}, action) {
  switch (action.type) {
    case 'SEARCH':
      return action.payload;
    default:
      return state;
  }
}
