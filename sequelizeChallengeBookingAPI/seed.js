const {auth, Bookmark} = require('./db')
console.log(Bookmark)
Bookmark.sync({
    force: true
}).then(() => {
    return Bookmark.create({
        url: 'https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9',
        title: '6 Reasons Why JavaScript’s Async/Await Blows Promises Away (Tutorial)'
    })
}).then(() => {
    return Bookmark.create({
        url: 'https://expressjs.com/',
        title: 'Express.js Website'
    })
}).then(() => {
    Bookmark.findAll().then(bookmarks => {
        // console.log(bookmarks)
    })
})