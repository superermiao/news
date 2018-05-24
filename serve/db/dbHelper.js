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
        console.log('总数： ' + count);
        console.log('一页的记录：', results);
        $page.pageCount = Math.floor((count - 1) / pageSize + 1);
        $page.results = results.records;
        $page.count = count;
        $page.currentPage = page;
        console.log('需要传给回掉函数的数据', $page);
        callback(err, $page);
    });
};
var manyQuery = function (Model, param, callback) {
    Model.find(param).exec(callback);
};
module.exports = {
    pageQuery: pageQuery,
    manyQuery: manyQuery
};