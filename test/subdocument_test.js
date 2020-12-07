const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'PostTitle' }] });
    joe.save().then(() => {
      User.findOne({ name: 'Joe' }).then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
    });
  });

  it('Can add subdocuments to an existing record', (done) => {
    // 1.create joe
    const joe = new User({ name: 'Joe', posts: [] });
    // 2.save joe
    joe.save().then(() => {
      // 3. find joe
      User.findOne({ name: 'Joe' })
        .then((user) => {
          // 4. add new post!
          user.posts.push({ title: 'New Post' });
          return user.save();
        })
        .then(() => {
          // 5. find joe
          User.findOne({ name: 'Joe' }).then((user) => {
            // 6. assert new post exists!
            assert(user.posts[0].title === 'New Post');
            done();
          });
        });
    });
  });

  it('can remove an existing subdocument', (done) => {
    // 1. create user with posts
    const joe = new User({ name: 'Joe', posts: [{ title: 'New Title' }] });
    // 2. save user
    joe.save().then(() => {
      // 3. find user
      User.findOne({ name: 'Joe' })
        .then((user) => {
          // 4. remove subdocument!
          const post = user.posts[0];
          post.remove();
          return user.save();
        })
        .then(() => {
          // 5. find user
          User.findOne({ name: 'Joe' }).then((user) => {
            // 6. assert posts length is 0!
            assert(user.posts.length === 0);
            done();
          });
        });
    });
  });
});
