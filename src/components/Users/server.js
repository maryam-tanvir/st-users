const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
// const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests


// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'sthub.c3uguk04fjqb.ap-southeast-2.rds.amazonaws.com',
    user : 'stpostgres',
    password : 'stocktrader',
    database : 'postgres'
  }
})

console.log("connecting to database")

// Controllers - aka, the db queries
const main = require('./Controllers/main')

// App
const app = express()


// app.use(helmet())
app.use(cors({
  credentials:true,
  origin:["http://localhost:3000"]
}))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth

app.get('/crud', (req, res) => {
  console.log('GET /crud was called!')
  main.getTableData(req, res, db)})
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// App Server Connection
app.listen(5000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})

