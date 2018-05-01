/*
const express = require('express');
const router = express.Router();
const CategoriesModel = require('../../models/categories');
// GET
router.get('/categories',  function (req, res, next) {

});

// POST
router.post('/api/type/addType',  function (req, res, next) {
    var params = {
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName
    };
    CategoriesModel.save(params,function (err, doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
            })
        }
    })

});
module.exports = router;*/
