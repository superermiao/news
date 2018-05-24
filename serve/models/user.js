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
        type: String,
        default: ''
    },
    "userSign" : {
        type: String,
        default: '这个人很懒，什么都没留下'
    },
    "userEmail" :  {
        type: String,
        default: ''
    },
    "userTel" :  {
        type: String,
        default: ''
    },
    "userRealName" :  {
        type: String,
        default: ''
    },
    "userAddress" :  {
        type: String,
        default: ''
    },
    "updateTime" :  {
        type: Date,
        default: Date.now
    },
    "createTime" : {
        type: Date,
        default: Date.now
    },
    "userAnswer": {
        type: String
    },
    "userQuestion": {
        type: String
    },
    "role" : {
        type: String,
        default: '1'
    }
});
const UserModel = db.model('user',UserSchema);
module.exports = UserModel;