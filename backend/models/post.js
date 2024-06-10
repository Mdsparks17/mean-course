const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

//this stuff allows it to be managed by mongoose and mongoDB, but is not the connection
module.exports = mongoose.model('Post', postSchema);