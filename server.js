const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors());

// routes
// const routes = require('./routes')
// app.use(routes, '/api')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog-cms', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

app.listen(PORT, () => {
    console.log('server listening on port: ' + PORT)
})