// const User = require('./mongo').Admin;
// module.exports = {
//     // 通过用户名获取用户信息
//     getUserByName: function getUserByName (name) {
//         return User
//             .findOne({ name: name })
//             .addCreatedAt()
//             .exec()
//     }
// };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
   "name":{
       type: String,
       required: true
   },
   "pwd": String,
    "id": String
});
const AdminModel = mongoose.model('admin', AdminSchema);
module.exports = AdminModel;