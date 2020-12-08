const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name is required.'],
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }],
});

// this here needs function, not arrow function
// so that this points to correct object
UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// behind scene,
// mongoose ask mongo to create colection
const User = mongoose.model('user', UserSchema);

module.exports = User;
