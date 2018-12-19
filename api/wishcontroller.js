var express = require("express");
var mongoose = require('mongoose')
var User = require("./../user.js");
var Wish = require("./wish.js");
var configcontroller = require("./../config/configcontroller");
exports.make = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var playerid = mongoose.Types.ObjectId(req.body.playerid);
    var wishcontent = req.body.wishcontent;
    var buddhaid = req.body.buddhaid;
    var wishid = req.body.wishid;
    var ispublic = req.body.ispublic;

    var wishconfig = configcontroller.getwishconfig();
    var wish = null;
    console.log( "----" + wishconfig.length);
    for (i = 0; i < wishconfig.length; i++)
    {
        console.log(wishconfig[i].ID + "----" + wishid);
        if (wishconfig[i].ID == wishid)
        {
            wish = wishconfig[i];
        }
    }
    if (wish != null)
    {
        //, $gte: { blessingscoin: wish.Price }
        var conditions = { _id: playerid, blessingscoin: { $gte: wish.Price } };
        var updates = { $inc: { blessingscoin: -wish.Price } };
        console.log(wish.Price);
        User.findOneAndUpdate(conditions, updates, function (err, doc)
        {
            if (doc != null)
            {
                var wish = new Wish();
                wish.playerid = playerid;
                wish.creattime = new Date();
                wish.wishcontent = wishcontent;
                wish.buddhaid = buddhaid;
                wish.wishid = wishid;
                wish.ispublic = ispublic;
                wish.save();
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

function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}
