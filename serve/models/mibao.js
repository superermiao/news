const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db');
const QuestionSchema = new Schema({
    "id": {
        type: String
    },
   "question": {
       type: String
   }
});
QuestionSchema.index({question:1});
const QuestionModel = db.model('mibao', QuestionSchema);
module.exports = QuestionModel;