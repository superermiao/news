const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewSchema = new Schema({
    "newsId":Number,
    "newsTitle":String,
    "newsContent":String,
    "author":String,
    "newsOrigin":String,
    "keywords":String,
    "createTime":Date,
    "categoryId":Number
});
module.exports = mongoose.model('new',NewSchema);