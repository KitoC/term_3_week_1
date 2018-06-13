const Sequelize = require('sequelize');

const con = new Sequelize(`postgres://postgres:admin@localhost:5433/bookmarks`)

const auth = con.authenticate().then(() => {
    console.log('Database Connection established.')
}).catch(err => {
    console.log('Could not connect to database: ', err)
})


const Bookmark = con.define('bookmarks', {
    url: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    }
})

module.exports = {
    auth,
    Bookmark
}