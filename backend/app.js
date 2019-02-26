const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');


const app = express();

mongoose.connect('mongodb://localhost:27017/node-angular',{useNewUrlParser: true}).then(() => {
    console.log('Connected to DB');
}).catch(() => {
    console.log('Failed to connect to DB');
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/posts',postsRoutes);

module.exports = app;