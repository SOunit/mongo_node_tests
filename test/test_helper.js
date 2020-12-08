// EXEC FLOW
// mocha start
// tell mongoose to connect to Mongo
// wait...
// mongoose connects to mongo
// connection successful? run tests
// connection fail? show error

const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://mongo/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, blogposts, comments } = mongoose.connection.collections;
  // console.log('comments', comments);
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
