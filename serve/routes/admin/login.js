const express = require('express');
const router = express.Router();
const AdminModel = require('../../models/admin');
const checkNotLogin = require('../../middlewares/check').checkNotLogin;
router.get('/',  function (req, res, next) {
});

router.post('/api/admin/login',function (req, res, next) {
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
                    data:{
                        name:doc.name,
                        role: doc.role
                    }
                })
            }
        }
    })
});
module.exports = router;