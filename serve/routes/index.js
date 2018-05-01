const express = require('express');
const router = express.Router();
const CategoriesModel = require('../models/categories');
const dbHelper = require('../db/dbHelper');
router.post('/news/list', function(req, res, next){

});
router.post('/type/list',function (req,res, next) {
    if (req.body){
        var page = parseInt(req.body.page) || 1;
        var pageSize = parseInt(req.body.page_size)|| 10;
        dbHelper.pageQuery(page, pageSize, CategoriesModel, '', {}, {categoryDate: 'desc'},function (err, data) {
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
module.exports = router;
