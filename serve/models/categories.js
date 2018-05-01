const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db');
const CategorySchema = new Schema({
    "categoryName":{
        type: String,
        required: true,
        unique: true
    },
    "subCategory": {
        type: Array
    },
    "categoryDate": {
        type: Date,
        default: Date.now
    }
});
CategorySchema.index({adminName:1,_id: 1});
const CategoriesModel = db.model('categorie',CategorySchema);
module.exports = CategoriesModel;