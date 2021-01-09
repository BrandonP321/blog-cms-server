const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// routes
const user = require('./routes/user')
const post = require('./routes/post')

app.use('/api', user)
app.use('/api', post)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog-cms', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

app.listen(PORT, () => {
    console.log('server listening on port: ' + PORT)
})