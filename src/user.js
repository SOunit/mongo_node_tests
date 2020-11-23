const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  postCount: Number,
});

// behind scene,
// mongoose ask mongo to create colection
const User = mongoose.model('user', UserSchema);

module.exports = User;
