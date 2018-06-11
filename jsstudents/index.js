// Creating a table in a database with sequelize... 


const Sequelize = require('sequelize')


//  Create a new instance of Sequelize with a connection string
// postgres://username:password@domain:port/db-name
const con = new Sequelize(`
        postgres://postgres:admin@localhost:5433/students
        `)

//  Establish a connection to the server and login
con.authenticate().then(() => {
    console.log('connected!!!!')
}).catch(err => {
    console.error('Connection failed: ', err)
})

//  Define schema for storing a User model
const User = con.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
})

//  Sync schema to db (like rails db:migrate)
//  'force: true' drops the table if it already exists. It also deletes all the data within that table.
User.sync({
    force: true
}).then(() => {
    console.log('Schema created!')
    // Inserts new user into db
    return User.create({
        firstName: 'Billy',
        lastName: 'Bones'
    })
}).then(() => {
    User.findAll().then(users => {
        console.log(users)
    })
})