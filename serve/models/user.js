const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    "userId":Number,
    "userName":String,
    "userPwd":String,
    "userAvatar":String,
    "userSign":String,
    "userEmail":String,
    "userTel":Number,
    "userRealName":String,
    "userAddress":String
});
module.exports = mongoose.model('user',UserSchema);