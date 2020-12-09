const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'title', content: 'blog post content' });

    // automatic id association by mongoose by push instance, or assign instance
    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => {
      // sign for moca, data is ready
      done();
    });
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe
      .remove()
      .then(() => {
        return BlogPost.count();
      })
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
