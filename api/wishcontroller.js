var express = require("express");
var mongoose = require('mongoose')
var User = require("./user.js");
var Wish = require("./wish.js");
var configcontroller = require("../config/configcontroller");
exports.make = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var playerid = mongoose.Types.ObjectId(req.body.playerid);
    var playername = req.body.playername;
    var wishcontent = req.body.wishcontent;
    var buddhaid = req.body.buddhaid;
    var wishid = req.body.wishid;
    var ispublic = req.body.ispublic;

    var wishconfig = configcontroller.getwishconfig();
    var wish = null;
    for (i = 0; i < wishconfig.length; i++)
    {
        if (wishconfig[i].ID == wishid)
        {
            wish = wishconfig[i];
        }
    }
    if (wish != null)
    {
        var conditions = { _id: playerid, blessingscoin: { $gte: wish.Price } };
        var updates = { $inc: { blessingscoin: -wish.Price } };
        User.findOneAndUpdate(conditions, updates, function (err, doc)
        {
            if (doc != null)
            {
                var makewish = new Wish();
                makewish.playerid = playerid;
                makewish.creattime = new Date();
                makewish.wishcontent = wishcontent;
                makewish.buddhaid = buddhaid;
                makewish.wishid = wishid;
                makewish.ispublic = ispublic;
                makewish.price = wish.Price;
                makewish.playername = playername;
                makewish.save();
                result.code = 0;
                result.msg = "make wish sucess";
                saveResult(res, result);
            }
            else
            {
                result.code = 2;
                result.msg = "blessing coin not enough";
                saveResult(res, result);
            }
        });
    }
    else
    {
        result.code = 1;
        result.msg = "can't find wish config,id=" + wishid;
        saveResult(res, result);
    }
}

exports.get = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var playerid = mongoose.Types.ObjectId(req.body.playerid);
    var conditionsprice = { price: { $gt: 0 }, ispublic: 1 };
    Wish.find(conditionsprice)
        .select('wishid wishcontent buddhaid ispublic playername creattime')
        .sort({ "creattime": -1 })
        .limit(100)
        .exec(function (err, doc)
        {
            result.pricewish = JSON.stringify(doc);
            var conditionall = { ispublic: 1 };
            Wish.find(conditionall)
                .select('wishid wishcontent buddhaid ispublic playername creattime')
                .sort({ "creattime": -1 })
                .limit(100)
                .exec(function (err1, doc1)
                {
                    result.allwish = JSON.stringify(doc1);

                    var conditionself = { playerid: playerid };
                    Wish.find(conditionself)
                        .select('wishid wishcontent buddhaid ispublic playername creattime')
                        .sort({ "creattime": -1 })
                        .limit(100)
                        .exec(function (err2, doc2)
                        {
                            result.selfwish = JSON.stringify(doc2);
                            saveResult(res, result);
                        });
                });
        });
}

function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}
