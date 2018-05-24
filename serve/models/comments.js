const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db');
const CommentSchema = new Schema({
    "commentContent":String,
    "createTime": {
        type: Date,
        default: Date.now
    },
    "userId":String,
    "userName": String,
    "newsId":String,
    "status": {
        type: String,
        default: '0'
    }
});
CommentSchema.index({createTime:1});
const CommentModal = db.model('comment', CommentSchema);
module.exports = CommentModal;