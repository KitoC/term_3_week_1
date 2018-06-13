const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let cheerio = require('cheerio')
const request = require('request')
const {auth, Bookmark} = require('./db')
console.log(Bookmark)
console.log(auth)





// con.authenticate().then(() => {
//     console.log('Database Connection established.')
// }).catch(err => {
//     console.log('Could not connect to database: ', err)
// })






app.get('/bookmarks', async (req, res) => {
    res.send(await Bookmark.findAll())
})

app.get('/bookmarks/:id', async (req, res) => {
    res.send(await Bookmark.find({
        where: { id: req.params.id }}
    ))
    // res.json(await Bookmark.findById(req.params.id))
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/bookmarks', (req, res) => {
    Bookmark.create({
        url: req.body.url,
        title: req.body.title
    })
})

app.post('/bookmarks/new', (req, res) => {
    titleScraper(req.body.url, function(title) {
        if (req.body.title === undefined){
            req.body.title = title
        } 
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