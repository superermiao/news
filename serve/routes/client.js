const express = require('express');
const router = express.Router();
const AdminModel = require('../models/admin');
const UserModel = require('../models/user');
const NewsModel = require('../models/news');
const QuestionModel = require('../models/mibao');
const CommentModel = require('../models/comments');
const dbHelper = require('../db/dbHelper');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
/*登录*/
router.post('/login', function(req, res, next){
    console.log('进入登陆', req.body.userName);
    console.log(req.body);
    if (req.body){
        var params = {
            userName: req.body.userName,
            /*userPwd: md5.update(req.body.userPwd).digest('hex')*/
            userPwd: req.body.userPwd
        };
        UserModel.findOne(params, function (err, data) {
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else if(!data){
                res.json({
                    status: '1',
                    data: '用户名或密码不正确'
                });
            } else {
                res.json({
                    status: '0',
                    data: data
                });
            }
        })
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*注册*/
router.post('/register',function (req, res, next) {
    if(req.body) {
        var params = {
            userName: req.body.userName,
           /* userPwd: md5.update(req.body.userPwd).digest('hex'),*/
            userPwd: req.body.userPwd,
            createTime: Date.now(),
            updateTime: Date.now()
        };
        UserModel.create(params,function (err, data) {
            if(err){
                res.json({
                    status: '1',
                    data: err.message
                });
            } else {
                res.json({
                    status: '0',
                    data: data
                });
            }
        })
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*查询用户*/
router.post('/find-user',function (req,res,next) {
    if(req.body) {
        var params = {};
        if (!req.body.userQuestion) {
             params = {
                userName: req.body.userName
            };
        } else {
             params = {
                userName: req.body.userName,
                userQuestion: req.body.userQuestion,
                userAnswer: req.body.userAnswer
            };
        }
        console.log(params);
        UserModel.findOne(params,function (err, data) {
            if(err){
                res.json({
                    status: '1',
                    data: err.message
                });
            } else if (data){
                res.json({
                    status: '0',
                    data: data
                });
            } else if (!data) {
                res.json({
                    status: '1',
                    data: '用户名或密保答案错误'
                });
            }
        })
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*查找所有新闻*/
router.get('/news-list',function (req, res, next) {
    NewsModel.find(function (err,data) {
        if (err) {
            res.json({
                status: '1',
                data: err.message
            });
        } else {
            res.json({
                status: '0',
                data: data
            });
        }
    });
});
/*根据id查询用户*/
router.post('/find-one-user',function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        UserModel.findById(id,function (err,data) {
            if (err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else if(data) {
                res.json({
                    status: '0',
                    data: data
                });
            } else if (!data) {
                res.json({
                    status: '0',
                    data: '查找失败'
                });
            }
        })
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*用户更新个人信息*/
router.post('/update-user',function (req, res, next) {
    if(req.body) {
        var params = {
            userName: req.body.userName,
            userTel: req.body.userTel,
            userEmail: req.body.userEmail,
            userSign: req.body.userSign,
            userRealName: req.body.userRealName,
            userAddress: req.body.userAddress,
            userAvatar: req.body.userAvatar,
            userAnswer: req.body.userAnswer,
            userQuestion: req.body.userQuestion,
            updateTime: Date.now()
        };
        var id = req.body.id;
        UserModel.findByIdAndUpdate(id,params,{new:true},function (err,data) {
            if (err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else {
                res.json({
                    status: '0',
                    data: data
                });
            }
        })
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*查询密保问题*/
router.get('/question-list', function (req, res, next) {
    QuestionModel.find(function (err,data) {
        if (err) {
            res.json({
                status: '1',
                data: err.message
            });
        } else {
            res.json({
                status: '0',
                data: data
            });
        }
    });
});
/*个人中心密码修改*/
router.post('/update-pwd',function (req, res, next) {
    if(req.body) {
        var origin = {
            userName: req.body.userName,
            userPwd: req.body.originPwd
        };
        var params = {
            userPwd: req.body.newPwd
        };
        UserModel.findOne(origin, function (err, data) {
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else if(!data){
                res.json({
                    status: '1',
                    data: '当前密码不正确'
                });
            } else {
                UserModel.update({ userName: req.body.userName}, params, function (err, doc) {
                    if(err) {
                        res.json({
                            status: '1',
                            data: err.message
                        });
                    } else {
                        res.json({
                            status: '0',
                            data: doc
                        });
                    }
                });
            }
        })
       
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*忘记密码，修改*/
router.post('/modify-pwd',function (req, res, next) {
    if(req.body) {
        var params = {
            userPwd: req.body.userPwd
        };
        UserModel.update({ userName: req.body.userName}, params, function (err, doc) {
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else {
                res.json({
                    status: '0',
                    data: doc
                });
            }
        });
    }
});
/*发表,添加评论*/
router.post('/add-comment', function (req, res, next) {
    if(req.body) {
        var params = {
            userName: req.body.userName,
            createTime: Date.now(),
            newsId: req.body.newsId,
            commentContent: req.body.content,
            userId: req.body.userId
        };
        CommentModel.create(params,function (err, data) {
            if(err){
                res.json({
                    status: '1',
                    data: err.message
                });
            } else {
                res.json({
                    status: '0',
                    data: data
                });
            }
        })
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
/*显示评论*/
router.post('/show-comment',function (req, res, next) {
    if (req.body){
        console.log('返回的数', req.body);
        var page = parseInt(req.body.page) || 1;
        var pageSize = parseInt(req.body.page_size)|| 5;
        var params = {
            status: '1',
            newsId: req.body.newsId
        };
        dbHelper.pageQuery(page, pageSize, CommentModel, 'userId', params, {createTime: -1},function (err, data) {
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else{
               /* res.json({
                    status: '0',
                    pageCount: data.pageCount,
                    count: data.count,
                    currentPage: data.currentPage,
                    data: data.results
                });*/
               // 防止用户密码和密保问题泄露
                var arr = [];
                var currentCount = 0;
                if (parseInt(data.count) <= parseInt(pageSize)) {
                    currentCount = data.count;
                } else {
                    currentCount =  data.count - (parseInt(page)-1)*parseInt(pageSize);
                }
                console.log('当前页的条数', currentCount);
                console.log('当前页的pageSize', pageSize);
                for(var i= 0; i < currentCount;i++){
                    data.results[i].userId.userPwd = '';
                    data.results[i].userId.userQuestion = '';
                    data.results[i].userId.userAnswer = '';
                    arr.push(data.results[i]);
                }
                console.log('总条数', data.count);
                res.json({
                    status: '0',
                    pageCount: data.pageCount,
                    count: data.count,
                    currentPage: data.currentPage,
                    data: arr
                });
            }
        });
    } else {
        res.json({
            status: '1',
            data: '遭遇未知错误'
        });
    }
});
module.exports = router;