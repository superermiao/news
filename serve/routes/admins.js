const express = require('express');
const router = express.Router();
const CategoriesModel = require('../models/categories');
const UserModal = require('../models/user');
const AdminModel = require('../models/admin');
const NewsModel = require('../models/news');
const CommentModel = require('../models/comments');
const dbHelper = require('../db/dbHelper');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
/*登录*/
router.post('/login', function(req, res, next){
    console.log('进入登陆', req.body.name);
    console.log(req.body);
    if (req.body){
        var params = {
            adminName: req.body.name,
            adminPwd: req.body.pwd
        };
        AdminModel.findOne(params, function (err, data) {
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
                    data: '登陆成功'
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
/*查找所有分类*/
router.get('/type-list',function (req, res, next) {
        CategoriesModel.find(function (err,data) {
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
});
/*添加分类*/
router.post('/add-type',function (req, res, next) {
   console.log('添加分类');
   if(req.body) {
       var params = {
           categoryName: req.body.categoryName,
           categoryDate: Date.now()
       };
       CategoriesModel.create(params,function (err, data) {
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
/*修改分类*/
router.post('/update-type',function (req, res, next) {
    if(req.body) {
        var id = req.body.id;
        var name = req.body.categoryName;
        CategoriesModel.findByIdAndUpdate(id,{categoryName: name, categoryDate: Date.now()},{new:true},function (err,data) {
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
/*根据ID查找分类*/
router.post('/find-one-type', function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        CategoriesModel.findById(id,function (err,data) {
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
/*删除分类*/
router.post('/delete-one',function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        CategoriesModel.findByIdAndRemove(id,function (err,data) {
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
/*根据页数查询所有用户*/
router.post('/user-list', function (req,res,next) {
    if (req.body){
        console.log(req.body);
        var page = parseInt(req.body.page) || 1;
        var pageSize = parseInt(req.body.page_size)|| 10;
        var query = {};
        if (req.body.idx_value) {
            query[req.body.idx] = new RegExp(req.body.idx_value, "i");
        }
        dbHelper.pageQuery(page, pageSize, UserModal, '', query, {},function (err, data) {
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else{
                res.json({
                    status: '0',
                    pageCount: data.pageCount,
                    count: data.count,
                    currentPage: data.currentPage,
                    data: data.results
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
/*根据ID删除用户*/
router.post('/delete-user', function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        UserModal.findByIdAndRemove(id,function (err,data) {
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
/*查询所有管理员*/
router.post('/admin-list', function (req,res,next) {
    if (req.body){
        console.log(req.body);
        var page = parseInt(req.body.page) || 1;
        var pageSize = parseInt(req.body.page_size)|| 10;
        var query = {};
        if (req.body.idx_value) {
            query[req.body.idx] = new RegExp(req.body.idx_value, "i");
        }
        dbHelper.pageQuery(page, pageSize, AdminModel, '', query, {},function (err, data) {
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else{
                res.json({
                    status: '0',
                    pageCount: data.pageCount,
                    count: data.count,
                    currentPage: data.currentPage,
                    data: data.results
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
/*根据ID删除管理员*/
router.post('/delete-admin', function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        AdminModel.findByIdAndRemove(id,function (err,data) {
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
/*添加管理员*/
router.post('/add-admin',function (req, res, next) {
    if(req.body) {
        var params = {
            adminName: req.body.adminName,
            adminPwd: req.body.adminPwd,
            adminTel: req.body.adminTel,
            adminEmail: req.body.adminEmail,
            role: req.body.role,
            adminDate: Date.now()
        };
        AdminModel.create(params,function (err, data) {
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
/*修改管理员*/
router.post('/update-admin',function (req, res, next) {
    if(req.body) {
        var params = {
            adminName: req.body.adminName,
            adminPwd: req.body.adminPwd,
            adminTel: req.body.adminTel,
            adminEmail: req.body.adminEmail,
            role: req.body.role,
            adminDate: Date.now()
        };
        var id = req.body.id;
        AdminModel.findByIdAndUpdate(id,params,{new:true},function (err,data) {
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
/*根据ID查找管理员*/
router.post('/find-one-admin', function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        AdminModel.findById(id,function (err,data) {
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
/*添加新闻*/
router.post('/add-news',function (req,res,next) {
    if(req.body) {
        var params = {
            category: req.body.category,
             author: req.body.author ,
            excerpt: req.body.excerpt ,
            content: req.body.content ,
            origin : req.body.origin  ,
            title  : req.body.title,
            status: '1',
            update: Date.now()
        };
        NewsModel.create(params,function (err, data) {
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
/*删除新闻*/
router.post('/delete-one-news',function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        NewsModel.findByIdAndRemove(id,function (err,data) {
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
/*根绝ID查找新闻*/
router.post('/find-one-news',function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        NewsModel.findById(id,function (err,data) {
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
/*后台根据页数查找所有新闻*/
router.post('/news-list',function (req,res,next) {
    if (req.body){
        var page = parseInt(req.body.page) || 1;
        var pageSize = parseInt(req.body.page_size)|| 10;
        var params = {};
        if (req.body.category_id) {
            params['category'] = req.body.category_id;
        }
        if (req.body.idx_value) {
            params[req.body.idx] = new RegExp(req.body.idx_value, "i");
        }
        if (req.body.status) {
            params['status'] = req.body.status;
        }
        dbHelper.pageQuery(page, pageSize, NewsModel, '', params, {newsDate: 'desc'},function (err, data) {
            console.log('得到的数据', data);
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else{
                res.json({
                    status: '0',
                    pageCount: data.pageCount,
                    count: data.count,
                    currentPage: data.currentPage,
                    data: data.results
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
/*将新闻审核状态转为发布新闻*/
router.post('/update-news-status', function (req,res,next) {
    if (req.body){
        var id = req.body.id;
        var status = req.body.status;
        NewsModel.findByIdAndUpdate(id,{status: status, update: Date.now()}, {new: true}, function (err,data) {
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
/*修改新闻*/
router.post('/update-news',function (req,res,next) {
    if(req.body) {
        var id = req.body.id;
        var params = {
            category: req.body.category,
            author: req.body.author ,
            excerpt: req.body.excerpt ,
            content: req.body.content ,
            origin : req.body.origin  ,
            title  : req.body.title,
            status: '1',
            update: Date.now()
        };
        NewsModel.findByIdAndUpdate(id,params,{new:true},function (err, data) {
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
/*复制新闻*/
/*router.post('copy-one-news',function () {

});*/
/*根据页数查看评论*/
router.post('/comment-list',function (req,res, next) {
    if (req.body){
        var page = parseInt(req.body.page) || 1;
        var pageSize = parseInt(req.body.page_size)|| 5;
        var params = {};
        if (req.body.status) {
            params['status'] = req.body.status;
        }
        dbHelper.pageQuery(page, pageSize, CommentModel, '', params, {createTime: 'desc'},function (err, data) {
            console.log('得到的数据', data);
            if(err) {
                res.json({
                    status: '1',
                    data: err.message
                });
            } else{
                res.json({
                    status: '0',
                    pageCount: data.pageCount,
                    count: data.count,
                    currentPage: data.currentPage,
                    data: data.results
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
/*审核评论*/
router.post('/update-comment-status', function (req, res, next) {

});
/*删除单条评论*/
router.post('/delete-one-comment', function (req, res, next) {

});

module.exports = router;