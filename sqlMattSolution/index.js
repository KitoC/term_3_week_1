const { Bookmark, auth } = require('./db')

auth
  .then(() => {
    console.log('Connection has been established successfully.');
  }).then(() => {

    const express = require('express')
    const app = express()

    var bodyParser = require('body-parser')
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));

    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(3333, () => console.log('Example app listening on port 3000!'))

    app.get('/bookmarks', async (req, res) => {
      res.json(await Bookmark.findAll())
      // Bookmark.findAll().then((value) => {
      //   res.json(value)
      // })
    })

    app.get('/bookmarks/:id', (req, res) => {
      Bookmark.findById(req.params.id).then((value) => {
        res.json(value)
      })
    })

    app.post('/bookmarks', (req, res) => {
      Bookmark.create({
        url: req.body.url,
        title: req.body.title
      }).then(value => {
        res.json(value)
      }).catch(error => {
        res.json(error)
      })
    })

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
