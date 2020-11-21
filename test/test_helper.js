// EXEC FLOW
// mocha start
// tell mongoose to connect to Mongo
// wait...
// mongoose connects to mongo
// connection successful? run tests
// connection fail? show error

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/users_test');
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
