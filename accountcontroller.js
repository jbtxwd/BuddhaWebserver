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
        username: 'Tracy McGrady',                 //�û��˺�
        userpwd: 'abcd',                            //����
        userage: 37,                                //����
        logindate: new Date()                      //�����¼ʱ��
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