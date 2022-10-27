require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const connect = require('./config/database')
let Grid = require('gridfs-stream');
const upload = require('./routes/photo.route')
const routes = require('./routes/index')
const fs = require('fs')
const app = express()


dotenv.config()

let gfs;
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
// app.use('/authem', authemRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('listening on port')
})

