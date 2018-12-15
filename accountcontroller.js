var express = require("express"); 
var mongoose = require('mongoose');
var User = require("./user.js");
exports.regist = function(req,res)
{
    var username = req.body.username;
    User.find({ username: username }, function (err, doc)
    {
        var result = { "code": -1, "msg": ""};
        if (!err)
        {
            if (doc!=null && doc.length > 0)//有相同的账号
            {
                console.log("has player");
                result.code = 1;
                result.msg = "has same count";
                saveResult(res, result);
            }
            else
            {
                var user = new User();
                user.username = username;
                user.password = req.body.password;
                user.accounttype = req.body.accounttype;
                user.deviceid = req.body.deviceid;

                user.save(function (err, res)
                {

                    if (err)
                    {
                        result.code = 2;
                        result.msg = "error";
                        saveResult(res, result);
                    }
                    else
                    {
                        result.code = 0;
                        result.msg = "regist success";
                        saveResult(res, result);
                    }
                });
            }
        }
        else
        {
            result.code = 2;
            result.msg = "has error";
            saveResult(res, result);
        }

    });
}

exports.login = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var deviceid = req.body.deviceid;
    var logintype = req.body.logintype;

    if (logintype == 1)//游客登陆
    {
        User.findOne({ deviceid: deviceid }, function (err, doc)
        {
        });
    }
    else if (logintype == 2)//用户名密码登录
    {
        User.findOne({ username: username, password: password }, function (err, doc)
        {
        });
    }
    //User.find({ username: username }, function (err, doc) {
    //    var result = { "code": -1, "msg": "" };
    //    if (!err) {
    //        if (doc != null && doc.length > 0)//有相同的账号
    //        {
    //            console.log("has player");
    //            result.code = 1;
    //            result.msg = "has same count";
    //            saveResult(res, result);
    //        }
    //        else {
    //            var user = new User();
    //            user.username = username;
    //            user.password = req.body.password;
    //            user.accounttype = req.body.accounttype;
    //            user.deviceid = req.body.deviceid;

    //            user.save(function (err, res) {

    //                if (err) {
    //                    result.code = 2;
    //                    result.msg = "error";
    //                    saveResult(res, result);
    //                }
    //                else {
    //                    result.code = 0;
    //                    result.msg = "regist success";
    //                    saveResult(res, result);
    //                }
    //            });
    //        }
    //    }
    //    else {
    //        result.code = 2;
    //        result.msg = "has error";
    //        saveResult(res, result);
    //    }

    //});
}

exports.test =function(req,res) 
{
    var user = new User({
        username: 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate: new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
    res.send('Data inited'); 
}

function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}