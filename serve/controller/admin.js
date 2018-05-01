const AdminModel = require('../models/admin');
function admin() {
    this.login = function (req, res, next) {
        var params = {
            name: req.body.name,
            pwd: req.body.pwd
        };
        AdminModel.findOne(params, function (err, doc) {
            if (err) {
                res.json({
                    status: "1",
                    msg: err.message
                })
            } else {
                if (doc) {
                    // res.cookie("id",doc.id,{
                    //     path:'/',
                    // });
                    //req.session.user = doc;
                    //console.log(req.session.user);
                    req.flash('success', '登陆成功');
                    //req.redirect('/posts');
                    res.json({
                        status: '0',
                        msg: '',
                        data: {
                            name: doc.name,
                            role: doc.role
                        }
                    })
                }
            }
        });
    }
}
module.exports = new admin();
