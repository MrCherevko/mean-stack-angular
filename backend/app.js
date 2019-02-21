const express = require('express');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req,res,next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    })
});

app.get('/api/posts',(req,res,next) => {
    const posts = [
        { 
            id: '23jfa3qjff', 
            title: 'server-side post', 
            content: 'This is coming from the server!'
        },{ 
            id: 'dadssadccd2a3qjff', 
            title: 'server-side post 2', 
            content: 'This is coming from the server 2!'
        },

    ];
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts
    });
});

module.exports = app;