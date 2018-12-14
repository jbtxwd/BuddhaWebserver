var express = require("express"); 
var mongoose = require('mongoose');
var User = require("./user.js");
exports.regist = function(req,res)
{
	console.log("1111");
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