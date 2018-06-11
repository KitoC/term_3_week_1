const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let cheerio = require('cheerio')
const request = require('request')



const con = new Sequelize(`postgres://postgres:admin@localhost:5433/bookmarks`)

con.authenticate().then(() => {
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




app.get('/bookmarks', async (req, res) => {
    res.send(await Bookmark.findAll())
})

app.get('/bookmarks/:id', async (req, res) => {
    res.send(await Bookmark.find({
        where: { id: req.params.id }}
    ))
})

// app.post('/bookmarks/:url/:title', (req, res) => {
//     res.send(Bookmark.create({
//         url: req.params.url,
//         title: req.params.title
//     }))
// })

// Using body-parser package
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/bookmarks/new', (req, res) => {
    // let theTitle = req.body.title
    // console.log(theTitle)

    // if (req.body.title === undefined) {
    //     titleScraper(req.body.url)

    // } else {
    //     theTitle = req.body.title
    // }
    titleScraper(req.body.url, function(title) {
        req.body.title = title
        console.log(req.body.title)

        console.log(req.body)
        Bookmark.create({
            url: req.body.url,
            title: req.body.title
        }).then(() => {
            res.end()
        })
    })
})



app.listen(3001, () => {
    console.log('Server is running on port 3001. ')
})


function titleScraper(url, callback){
    
    request(url, (error, response, body) => {
        if(error){
            console.log('There was a problem: ', error)
        }
        let $ = cheerio.load(body);
        let theTitle = $('title').text()
        console.log($('title').text())
        callback(theTitle)
    })
}