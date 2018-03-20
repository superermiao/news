// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//     "userId":Number,
//     "userName":String,
//     "userPwd":String,
//     "userAvatar":String,
//     "userSign":String,
//     "userEmail":String,
//     "userTel":Number,
//     "userRealName":String,
//     "userAddress":String,
//     "userAge":String,
//     "createdAt": {
//         type: Date,
//         default: Date.now
//     },
//     "updatedAt": {
//         type: Date,
//         default: Date.now
//     }
// });
// module.exports = mongoose.model('user',UserSchema);
// const User = require('./mongo').User;
// module.exports = {
//     //注册一个用户
//     create: function create(user) {
//         return User.create(user).exex();
//     }
// };