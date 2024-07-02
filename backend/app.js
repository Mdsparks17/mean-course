const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const postsRoutes = require("./routes/posts");

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

app.use("/api/posts", postsRoutes);

//exports all app and uses, registers new middleware
module.exports = app;
