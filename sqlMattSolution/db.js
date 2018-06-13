const Sequelize = require('sequelize')

const con = new Sequelize('postgres://postgres:admin@localhost:5432/bookmarks');

const Bookmark = con.define('bookmark', {
  url: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  }
});

const auth = con.authenticate()

module.exports = { Bookmark, auth }
