const router = express.Router();
const CategoriesModel = require('../models/categories');
// GET /signin 登录页
// router.get('/',  function (req, res, next) {
//     res.render('categories');
// });

// POST /signin 用户登录
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
    // AdminModel.findOne(params,function (err,doc) {
    //     if(err) {
    //         res.json({
    //             status:"1",
    //             msg:err.message
    //         })
    //     } else {
    //         if(doc){
    //             // res.cookie("id",doc.id,{
    //             //     path:'/',
    //             // });
    //             //req.session.user = doc;
    //             //console.log(req.session.user);
    //             req.flash('success','登陆成功');
    //             //req.redirect('/posts');
    //             res.json({
    //                 status:'0',
    //                 msg:'',
    //                 result:{
    //                     name:doc.name,
    //                 }
    //             })
    //         }
    //     }
    // })

});
module.exports = router;