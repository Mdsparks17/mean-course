const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: 'asdf1234', title: "First server-side post", content: "This is coming from the server"},
        { id: 'adfasd', title: "Second server-side post", content: "This is coming from the server!"}
    ];
    return res.status(200).json({
        message: 'Posts fetched succesfully!', 
        posts: posts
    }); 
});

//exports all app and uses, registers new middleware
module.exports = app;
