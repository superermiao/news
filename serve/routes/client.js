const express = require('express');
const router = express.Router();
const AdminModel = require('../models/admin');
router.post('/login', function(req, res, next){
    console.log('进入登陆', req.body.name);
    console.log(req.body);
    if (req.body){
        var params = {
            name: req.body.name,
            pwd: req.body.pwd
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

router.post('/news/list',function (req, res, next) {
    AdminModel.find()
});
module.exports = router;