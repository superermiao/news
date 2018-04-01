const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category = require('./categories');
const NewSchema = new Schema({
    "newsId":Number,
    "newsTitle":String,
    "newsContent":String,
    "author":String,
    "newsOrigin":String,
    "keywords":String,
    "createTime":Date.now(),
    "categoryId":[{type:Schema.Types.ObjectID, ref: 'category'}]
});
module.exports = mongoose.model('new',NewSchema);