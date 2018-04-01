const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    "categoryId":Number,
    "categoryName":String,
    "categoryType":String,
});
module.exports = mongoose.model('catrgorie',CategorySchema);