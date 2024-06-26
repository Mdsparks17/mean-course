const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const Post = require('./models/post');
const { createShorthandPropertyAssignment } = require('typescript');

const app = express();

//Password: mJRGaSDVghb5WiWV
mongoose.connect("mongodb+srv://Admin:mJRGaSDVghb5WiWV@cluster0.icdprmi.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Database is down');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
})

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    }); 
    //automagically saves to DB
    post.save().then(createdPost => {
        return res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost.id
        });
    });   
});

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({message: "Update Successful"})
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully!', 
            posts: documents
        }); 
    });
});

app.get("/api/posts/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'})
        }
    });
})

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    })
});

//exports all app and uses, registers new middleware
module.exports = app;
