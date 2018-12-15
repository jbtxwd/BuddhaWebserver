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
                user.username = req.body.username;
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
                        result.code = 1;
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
    var result = { "code": -1, "msg": "" };
    var username = req.body.username;
    var password = req.body.password;
    var deviceid = req.body.deviceid;
    var accounttype = req.body.accounttype;
    console.log("accounttype=" + accounttype);
    if (accounttype == 1)//游客登陆
    {
        User.findOne({ deviceid: deviceid }, function (err, doc)
        {
            if (doc != null)
            {
                result.code = 1;
                result.msg = "login sucess";
                result.userid = doc._id.toString();
                saveResult(res, result);
            }
            else//游客注册
            {
                var user = new User();
                user.username = username;
                user.password = password;
                user.accounttype = accounttype;
                user.deviceid = deviceid;
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
                        result.code = 1;
                        result.msg = "login sucess";
                        result.userid = doc._id.toString();
                        saveResult(res, result);
                    }
                });
            }
        });
    }
    else if (accounttype == 2)//用户名密码登录
    {
        User.findOne({ username: username, password: password }, function (err, doc)
        {
            if (doc != null)
            {
                console.log(doc._id.toString());
                result.code = 1;
                result.msg = "login sucess";
                result.userid = doc._id.toString();
                saveResult(res, result);
            }
            else//用户名或者密码不对
            {
                result.code = 0;
                result.msg = "login fail";
                saveResult(res, result);
            }
        });
    }
}

exports.accountdetail = function (req, res)
{
    var result = { "code": -1, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    User.findOne({ _id: _id }, function (err, doc)
    {
        if (doc != null)
        {
            result.code = 1;
            result.msg = "login sucess";
            result.data = doc;
            saveResult(res, result);
        }
    });
}
function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}