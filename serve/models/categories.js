const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db');
const CategorySchema = new Schema({
    "categoryId":Number,
    "categoryName":{
        type: String,
        required: true
    }
});
const CategoriesModel = db.model('categorie',CategorySchema);
module.exports = CategoriesModel;