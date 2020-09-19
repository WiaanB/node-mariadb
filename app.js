require('dotenv').config()
// Importing required packages
const express = require('express')
const cors = require('cors')
// Launching app and inserting middleware
const app = express()
app.use(cors())
app.use(express.json())
// Importing DB function to check the connection
const { checkConn } = require('./db.js')
// Routes
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
// App listening
app.listen(process.env.PORT, async () => {
    console.log('Server is running on: ' + process.env.PORT)
    checkConn()
})