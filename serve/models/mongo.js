const config = require('config-lite')(__dirname);
const Mongo = require('mongolass');
const mongolass = new Mongo();
mongolass.connect(config.mongodb);
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});
/*管理员*/
exports.Admin = mongolass.model('admin', {
   name: {type: 'string', required: true},
   pwd: { type: 'string', required: true }
});
exports.Admin.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一
/*用户*/
exports.User = mongolass.model('user', {
    userName: {type: 'string', required: true},
    userPwd: { type: 'string', required: true },
    userAvatar: { type: 'string'},
    userSign:{ type: 'string', default: '暂无签名'},
    userEmail:{ type: 'string'},
    userTel:{ type: 'string'},
    userRealName:{ type: 'string'},
    userAddress:{ type: 'string'},
    userAge:{ type: 'string'}
});
exports.User.index({ userName: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一
/*文章*/
exports.New = mongolass.model('new', {
    newsTitle:{ type: 'string', required: true },
    newsContent:{ type: 'string', required: true },
    author:{ type: 'string', required: true },
    newsOrigin:{ type: 'string'},
    keywords:{ type: 'string'},
    categoryId:{ type: Mongo.Types.ObjectId, required: true }
});
exports.New.index({ _id: -1 }).exec();// 按创建时间降序查看发布的文章列表
/*评论*/
exports.Comment = mongolass.model('comment', {
    userId: { type: Mongo.Types.ObjectId, required: true },
    content: { type: 'string', required: true },
    newsId: { type: Mongo.Types.ObjectId, required: true }
});
exports.Comment.index({ newsId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
/*分类*/
exports.Category = mongolass.model('category', {
    categoryName: {type: 'string', required: true},
    categoryType: {type: 'string', required: true}
});
exports.Comment.index({ categoryName: 1, _id: 1 },{ unique: true }).exec();// 按分类创建时间升序