require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const connect = require('./config/database')
const upload = require('./routes/photo.route')
const routes = require('./routes/index')
const app = express()

connect();
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(cors()) 
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

routes(app)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

