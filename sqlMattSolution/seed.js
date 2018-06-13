const { Bookmark, auth } = require('./db')

auth
  .then(() => {
    console.log('Connection has been established successfully.');
  }).then(() => {
    // force: true will drop the table if it already exists
    Bookmark.sync({force: true}).then(() => {
      // Table created
      Bookmark.create({
        url: 'http://google.com',
        title: 'Google'
      })
      Bookmark.create({
        url: 'http://wikipedia.org',
        title: 'Wikipedia'
      })
      Bookmark.create({
        url: 'http://github.com',
        title: 'Github'
      })
    });
})
