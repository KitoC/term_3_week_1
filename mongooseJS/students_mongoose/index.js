const {
    Enquiry
} = require('./db')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))

// Renders a 
app.get('/contact', (req, res) => {
    res.send(`
    <form method="post" action="/contact">
    <label for="name">Name</label>
    <input name="name">

    <label for="email">email</label>
    <input name="email">

    <label for="phone">phone</label>
    <input name="phone">

    <label for="message">message</label>
    <textarea name="message"></textarea>
    <button type="submit"> Send!</button>
    </form>
    `)
})

app.get('/enquiries', async (req, res)=>{
    const enquiries = await Enquiry.find()
    let html = '<table border="1px">'
    console.log(enquiries)
    for (enq of enquiries){
      html += `
      <tr>
      <td>${enq.name}</td>
      <td>${enq.email}</td>
      <td>${enq.phone}</td>
      <td>${enq.message}</td>
      <td>${enq._id}</td>
      <td><button onclick="deleteEnq(enq._id)">Delete</button></td>
      </tr>`
    }
    html += '</table>'
    res.send(html)
})

function deleteEnq(enqID){
   Enquiry.deleteOne({_id:ObjectId(`${enqID}`)})
}

app.get('/enquiries/:id', async (req, res) => {
    const enq = await Enquiry.find({_id: req.params.id})
    let html = '<table border="1px">'
    console.log(enq[0])
   
    html += `
      <tr>
      <td>${enq[0].name}</td>
      <td>${enq[0].email}</td>
      <td>${enq[0].phone}</td>
      <td>${enq[0].message}</td>
      <td>${enq[0]._id}</td>
      </tr>`
    
    html += '</table>'
    res.send(html)
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