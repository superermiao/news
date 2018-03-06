const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/user');
/* 连接数目库. */
mongoose.connect('mongodb://127.0.0.1:27017/news');

// 连接成功回调监听
mongoose.connection.on("connected", function(){
    console.log("mongodb connected success");
});

// 连接失败回调监听
mongoose.connection.on("error", function(){
    console.log("mongodb connected faile");
});

// 连接断开回调监听
mongoose.connection.on("disconnected", function(){
    console.log("mongodb connected disconnected");
});

router.get("/", function(req,res,next){
    Users.find({},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else {
            res.json({
                status:'0',
                msg:'',
                result: {
                    count: doc.length,
                    list:doc
                }
            });
        }
    });
});
module.exports = router;
