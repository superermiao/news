const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db');
const AdminSchema = new Schema({
   "adminName":{
       type: String,
       required: true,
       index: true,
       unique: true
   },
   "adminPwd": {
       type: String,
       required: true
   },
    "adminTel": {
       type: String
    },
    "adminEmail": {
       type: String
    },
    "role": {
        type: String,
        default:'1'
    },
    "adminDate": {
        type: Date,
        default: Date.now
    },
});
AdminSchema.index({adminName:1});
const AdminModel = db.model('admin', AdminSchema);
module.exports = AdminModel;