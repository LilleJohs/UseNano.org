export default function(search, newCorrectOrder, sort) {
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
      case "discount":
        keyA = a.discount;
        keyB = b.discount;
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
  return newSearch
}
