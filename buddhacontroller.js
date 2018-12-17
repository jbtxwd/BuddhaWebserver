var express = require("express");
var mongoose = require('mongoose');
var User = require("./user.js");
var Buddha = require("./buddha.js");
var configcontroller = require("./config/configcontroller");
//添加buddha
exports.addbuddha = function (req, res)
{
    var result = { "code": -1, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var buddhaid = req.body.buddhaid;
    var playername = req.body.playername;
    Buddha.find({ playerid: _id }, function (err, doc)
    {
        var count = doc.length;
        var buddhamodel = null;
        for (i = 0; i < doc.length; i++)
        {
            if (doc[i].buddhaid == buddhaid)
            {
                buddhamodel = doc[i];
            }
        }
        if (buddhamodel == null)
        {
            var buddha = new Buddha();
            buddha.buddhaid = buddhaid;
            buddha.playerid = _id;
            buddha.playername = playername;
            buddha.position = count;
            buddha.save(function (err, res1)
            {
                if (err)
                {
                    result.code = 1;
                    result.msg = "save error";
                    saveResult(res, result);
                }
                else
                {
                    result.code = 0;
                    result.msg = "add success";
                    saveResult(res, result);
                }
            });
        }
        else
        {
            result.code = 2;
            result.msg = "has same buddha error";
            saveResult(res, result);
        }
    });
}
//改变位置
exports.changeposition = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var buddhaida = req.body.buddhaida;
    var buddhaidb = req.body.buddhaidb;
    Buddha.find({ 'playerid': _id }, function (err,doc)
    {
        if (doc != null)
        {
            var buddhaa = null;
            var buddhab = null;
            for (i = 0; i < doc.length; i++)
            {
                if (doc[i].buddhaid == buddhaida)
                    buddhaa = doc[i];
                if (doc[i].buddhaid == buddhaidb)
                    buddhab = doc[i];
            }
            if (buddhaa !== null && buddhab !== null)
            {
                var positiona = buddhaa.position;
                var positionb = buddhab.position;
                buddhaa.position = positionb;
                buddhab.position = positiona;
                buddhaa.save();
                buddhab.save();
                result.code = 0;
                result.msg = "success!";
                saveResult(res, result);
            }
        }
        else
        {
            result.code = 2;
            result.msg = "no playerdata";
            saveResult(res, result);
        }
    });
}

exports.worship = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var itemid = req.body.itemid;
    var buddhaid = req.body.buddhaid;
    var nickname = req.body.nickname;

    var itemconfig = configcontroller.getitemconfig();
    var item = null;
    for (i = 0; i < itemconfig.length; i++)
    {
        if (itemconfig[i].ID == itemid)
        {
            item = itemconfig[i];
        }
    }
    if (item != null)
    {
        var conditions = { playerid: _id, buddhaid: buddhaid };
        var updates = null;
        if (item.Type == 1)//花
        {
            updates = { $set: { flower: itemid }, $inc: { effect: item.Effect }, $inc: { dailyeffect: item.Effect }};
        }
        else if (item.Type == 2)
        {
            updates = { $set: { fruit: itemid }, $inc: { effect: item.Effect }, $inc: { dailyeffect: item.Effect } };
        }
        else if (item.Type = 3)
        {
            updates = { $set: { incense: itemid }, $inc: { effect: item.Effect }, $inc: { dailyeffect: item.Effect } };
        }
        else if (item.Type = 4)
        {
            updates = { $set: { cup: itemid }, $inc: { effect: item.Effect }, $inc: { dailyeffect: item.Effect } };
        }
        Buddha.findOneAndUpdate(conditions, updates, function (err, doc)
        {
            if (doc != null)
            {
                result.code = 0;
                result.msg = "sucess";
                saveResult(res, result);
            }
            else
            {
                result.code = 1;
                result.msg = "no buddha data";
                saveResult(res, result);
            }
        });

        //var conditions1 = { playerid: _id, buddhaid: buddhaid };
        //var updates1 = null;
        //updates1 = { $inc: { effect: item.Effect } };

        //BuddhaDailyRank.findOneAndUpdate(conditions, updates, function (err, doc)
        //{
        //    if (doc != null)
        //    {
        //        console.log("dailyrank sucess");
        //    }
        //    else
        //    {
        //        var dailyrank = new BuddhaDailyRank();
        //        dailyrank.buddhaid = buddhaid;
        //        dailyrank.playerid = _id;
        //        dailyrank.playername = nickname;
        //        dailyrank.effect = item.Effect;
        //        dailyrank.save();
        //        console.log("new dailyrank sucess");
        //    }
        //});
    }
    else//找不到对应的物体
    {
        result.code = 3;
        result.msg = "no item";
        saveResult(res, result);
    }
}

exports.totalrank = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var buddhaid = req.body.buddhaid;
    var conditions = { buddhaid: buddhaid };
    Buddha.find(conditions)
        .select('playerid playername effect')
        .sort({ "effect": 1 })
        .limit(100)
        .exec(function (err, doc)
        {
            var result1 = { "code": 0, "msg": "" };
            var buddhaid1 = req.body.buddhaid;
            var conditions1 = { buddhaid: buddhaid };
            Buddha.find(conditions1)
                .select('playerid playername dailyeffect')
                .sort({ "dailyeffect": 1 })
                .limit(100)
                .exec(function (err1, doc1)
                {
                    result.code = 0;
                    result.msg = "sucess rank";
                    result.effect = doc;
                    result.dailyeffect = doc1;
                    saveResult(res, result);
                });
        });
}

//exports.dailyrank = function (req, res)
//{
//    var result = { "code": 0, "msg": "" };
//    var buddhaid = req.body.buddhaid;
//    var conditions = { buddhaid: buddhaid };
//    BuddhaDailyRank.find(conditions)
//        .select('playerid playername effect')
//        .sort({ "effect": 1 })
//        .limit(100)
//        .exec(function (err, doc)
//        {
//            result.code = 0;
//            result.msg = "sucess rank";
//            result.data = doc;
//            saveResult(res, result);
//        });
//}

function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}