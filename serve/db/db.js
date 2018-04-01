var chalk = require('chalk');
var mongoose = require('mongoose');
const config = require('config-lite')(__dirname);
// const url = require('../config/default');
//连接相应数据库
mongoose.connect(config.mongodb);
const db = mongoose.connection;
// 链接错误
db.on('error', function(error) {
    console.log(error);
});

// 链接成功
db.once('open', function(error) {
    console.log("数据库连接成功");
});
db.on('close', function() {
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.mongodb, {server:{auto_reconnect:true}});
});

module.exports = db;