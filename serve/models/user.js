const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db');
const UserSchema = new Schema({
    "userName" : {
        type: String,
        required: true,
        unique: true
    },
    "userPwd" :  {
        type: String,
        required: true,
    },
    "userAvatar" :  {
        type: String
    },
    "userSign" : {
        type: String,
        default: '这个人很懒，什么都没留下'
    },
    "userEmail" :  {
        type: String
    },
    "userTel" :  {
        type: String
    },
    "userRealName" :  {
        type: String
    },
    "userAddress" :  {
        type: String
    },
    "updateTime" :  {
        type: Date,
        default: Date.now
    },
    "createTime" : {
        type: Date,
        default: Date.now
    },
    "role" : {
        type: String
    }
});
const UserModel = db.model('user',UserSchema);
module.exports = UserModel;