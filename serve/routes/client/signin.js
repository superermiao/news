/*
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();
const AdminModel = require('../../models/admin');
const checkNotLogin = require('../../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
   console.log('signin');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
        var params = {
            name: req.body.name,
            pwd: req.body.pwd
    };
    AdminModel.findOne(params,function (err,doc) {
        if(err) {
            res.json({
                status:"1",
                msg:err.message
            })
        } else {
            if(doc){
                // res.cookie("id",doc.id,{
                //     path:'/',
                // });
                //req.session.user = doc;
                //console.log(req.session.user);
                req.flash('success','登陆成功');
                //req.redirect('/posts');
                res.json({
                    status:'0',
                    msg:'',
                    result:{
                        name:doc.name,
                    }
                })
            }
        }
    })

});
module.exports = router;*/
