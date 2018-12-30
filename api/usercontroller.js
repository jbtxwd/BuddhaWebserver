var express = require("express"); 
var mongoose = require('mongoose');
var User = require("./user.js");
var Buddha = require("./buddha.js");
var Item = require("./item.js");
var iap = require('in-app-purchase');
var configcontroller = require("../config/configcontroller");
iap.config(
    {
        /* Configurations for HTTP request */
        requestDefaults: { /* Please refer to the request module documentation here: https://www.npmjs.com/package/request#requestoptions-callback */ },

        /* Configurations for Apple */
        appleExcludeOldTransactions: true, // if you want to exclude old transaction, set this to true. Default is false
        applePassword: 'abcdefg...', // this comes from iTunes Connect (You need this to valiate subscriptions)    

        /* Configurations for Google Play */
        googlePublicKeyPath: 'path/to/public/key/directory/', // this is the path to the directory containing iap-sanbox/iap-live files
        googlePublicKeyStrSandBox: 'publicKeySandboxString', // this is the google iap-sandbox public key string
        googlePublicKeyStrLive: 'publicKeyLiveString', // this is the google iap-live public key string
        googleAccToken: 'abcdef...', // optional, for Google Play subscriptions
        googleRefToken: 'dddd...', // optional, for Google Play subscritions
        googleClientID: 'aaaa', // optional, for Google Play subscriptions
        googleClientSecret: 'bbbb', // optional, for Google Play subscriptions

        /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
        googleServiceAccount: {
            clientEmail: '<client email from Google API service account JSON key file>',
            privateKey: '<private key string from Google API service account JSON key file>'
        },

        /* Configurations all platforms */
        test: true, // For Apple and Googl Play to force Sandbox validation only
        verbose: false // Output debug logs to stdout stream
    });

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
                user.save(function (err1, res1)
                {
                    if (err1)
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
    var result = { "code": 0, "msg": "" };
    var username = req.body.username;
    var password = req.body.password;
    var deviceid = req.body.deviceid;
    var accounttype = req.body.accounttype;
    if (accounttype == 1)//游客登陆
    {
        var condition = { deviceid: deviceid, accounttype: 1 };
        User.findOne(condition, function (err, doc)
        {
            if (doc != null)
            {
                result.code = 0;
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
                user.save(function (err, doc2)
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
                        result.msg = "login sucess";
                        result.userid = doc2._id.toString();
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
                result.code = 0;
                result.msg = "login sucess";
                result.userid = doc._id.toString();
                saveResult(res, result);
            }
            else//用户名或者密码不对
            {
                result.code = 1;
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
            Buddha.find({ playerid: _id }, function (err1, doc1)
            {
                result.code = 1;
                result.msg = "login sucess";
                result.data = doc;
                result.buddhavalue = JSON.stringify(doc1);
                Item.find({ playerid: _id }, function (err2, doc2)
                {
                    result.item = JSON.stringify(doc2);
                    saveResult(res, result);
                });
            });
        }
    });
}

exports.recharge = function (req, res)
{
    var result = { "code": -1, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var receipt = req.body.receipt;
    var chargeid = req.body.chargeid;
    var storetype = req.body.storetype;//0 = editor,1 = appstore,2 = googleplay
    if (storetype != 0)
    {
        iap.validate(receipt)
            .then((response) =>
            {
                if (iap.isValidated(response))
                {
                    rechargesucess(_id, chargeid, res);
                }
                else
                {
                    result.code = 4;
                    result.msg = "iap  not validate";
                    saveResult(res, result);
                }
            })
            .catch((error) =>
            {
                result.code = 3;
                result.msg = "iap validate catch error";
                saveResult(res, result);
            });
    }
    else
    {
        rechargesucess(_id, chargeid, res);
    }
}

function rechargesucess(userid,chargeid,res)
{
    var result = { "code": -1, "msg": "" };
    var chargeconfig = configcontroller.getchargeconfig();
    var chargeitem = null;
    for (i = 0; i < chargeconfig.length; i++)
    {
        if (chargeconfig[i].ID == chargeid)
        {
            chargeitem = chargeconfig[i];
        }
    }
    if (chargeitem != null)
    {
        var conditions = { _id: userid };
        var updates = { $inc: { blessingscoin: chargeitem.Count } };
        User.findOneAndUpdate(conditions, updates, function (err, doc)
        {
            if (doc != null)
            {
                result.code = 0;
                result.msg = "recharge sucess";
                saveResult(res, result);
            }
            else
            {
                result.code = 1;
                result.msg = "cant find userinfo";
                saveResult(res, result);
            }
        });
    }
    else
    {
        result.code = 2;
        result.msg = "charge item not exist";
        saveResult(res, result);
    }
}

exports.changenickname = function (req, res)
{
    var result = { "code": -1, "msg": "" };
    var userid = mongoose.Types.ObjectId(req.body._id);
    var nickname = req.body.nickname;
    var condition = { _id: userid };
    var update = { nickname: nickname };
    User.findOneAndUpdate(condition, update, function (err, doc)
    {
        if (doc != null)
        {
            result.code = 0;
            result.msg = "change nicknam sucess";
            saveResult(res, result);
        }
        else
        {
            result.code = 1;
            result.msg = "change nicknam fail";
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