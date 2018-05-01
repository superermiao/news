const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category = require('./categories');
const NewSchema = new Schema({
    "title": {
        type: String,
        required: true
    },
    "content":  {
        type: String,
        required: true
    },
    "excerpt": {
        type: String
    },
    "comments": {
        type: Number,
        default: 0
    },
    "update": {
        type: Date,
        default: Date.now
    },
    "category": {
        type: String
    },
    "hot": {
        type: Number,
        default: 0
    },
    "author": {
        type: String
    },
    "origin": {
        type: String
    },
    "status": {
        type: String
    }
});
module.exports = mongoose.model('new',NewSchema);