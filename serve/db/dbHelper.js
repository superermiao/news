var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
/**
 * 分页查询
 * @param page当前页数
 * @param pageSize每页数量
 * @param Model
 * @param populate关联查询
 * @param queryParams查询条件
 * @param sortParams排序条件
 * @param callback回调函数
 */
var pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams,callback) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {  // 查询数量
            Model.count(queryParams).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {   // 查询一页的记录
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                done(err, doc);
            });
        },
    }, function (err, results) {
        var count = results.count;
        // 页数
        $page.pageCount = Math.ceil(count /pageSize);
        $page.results = results.records;
        // 总数
        $page.count = count;
        // 当前页
        $page.currentPage = page;
        callback(err, $page);
    });
};
var manyQuery = function (Model, param, callback) {
    Model.find(param).exec(callback);
};
var batchDelete = function (params, Model, callback) {
    for (var i = 0; i < params.length; i++) {
        Model.remove(params[i],function (err, data) {
           if(err) {
               callback(err,data);
           } else {
               return
           }
        })
    }
  }
module.exports = {
    pageQuery: pageQuery,
    manyQuery: manyQuery,
    batchDelete: batchDelete
};