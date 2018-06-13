const {
    Enquiry
} = require('./db')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/contact', (req, res) => res.sendFile('contactForm.html', {
    root: __dirname
}))



function displayEnquiries() {
    return new Promise((resolve, reject) => {
        let enqHTML = ``
        Enquiry.find().exec((err, enquiries) => {
            if (err) {
                reject(err)
            } else {
                for (enq in enquiries) {
                    enqHTML += `<h2>Message from: ${enquiries[enq].name}</h2>
                <p>Email: ${enquiries[enq].email}</p>
                <p>Ph: ${enquiries[enq].phone}</p>
                <p>Message: ${enquiries[enq].message}</p>
                <p>ID: ${enquiries[enq].id}</p>`
                }
                resolve(enqHTML)
            }
        })
    })
}



app.get('/enquiries', (req, res) => {
    displayEnquiries().then((html) => {
        res.send(html)
    }).catch(err => console.log(err))
})


app.post('/contact', (req, res) => {
    const enq = new Enquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })
    enq.save().then(() => {
        res.send('All good!')
    }).catch(err => {
        res.send(err)
    })
})

app.listen(9876, () => {
    console.log('Contact API listening on port 9876.')
})