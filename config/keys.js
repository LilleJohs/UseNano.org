if(process.env.NODE_ENV === 'production') {
  module.exports = {
    path: "merchants.yml"
  };
} else {
  module.exports = {
    path: "public/merchants.yml"
  };
}
