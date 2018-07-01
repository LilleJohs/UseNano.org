const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const physicalSchema = new Schema({
  name: String
});

mongoose.model('users', physicalSchema);
