var express = require("express");
var mongoose = require('mongoose');
var User = require("./user.js");
var Buddha = require("./buddha.js");
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
                //doc.save(function (err1, doc1)
                //{
                //    if (err1)
                //    {
                //        result.code = 1;
                //        result.msg = "save fail!";
                //        saveResult(res, result);
                //    }
                //    else
                //    {
                //        result.code = 0;
                //        result.msg = "success!";
                //        saveResult(res, result);
                //    }
                //});
            }
        }
        else
        {
            result.code = 2;
            result.msg = "no playerdata";
            saveResult(res, result);
        }
    });
    //User.findOne({ _id: _id }, function (err, doc)
    //{
    //    if (doc !== null)
    //    {
    //        var buddhavalue = doc.buddhavalue;
    //        if (typeof (buddhavalue) != "undefined" && buddhavalue != "" && buddhavalue != null)
    //        {
    //            var jsonarray = JSON.parse(buddhavalue);
    //            var buddhaa = null;
    //            var buddhab = null;
    //            for (i = 0; i < jsonarray.length; i++)
    //            {
    //                if (jsonarray[i]["id"] == buddhaida)
    //                    buddhaa = jsonarray[i];
    //                if (jsonarray[i]["id"] == buddhaidb)
    //                    buddhab = jsonarray[i];
    //            }
    //            if (buddhaa !== null && buddhab !== null)
    //            {
    //                var positiona = buddhaa.position;
    //                var positionb = buddhab.position;
    //                buddhaa.position = positionb;
    //                buddhab.position = positiona;
    //                doc.buddhavalue = JSON.stringify(jsonarray);
    //                doc.save(function (err, doc1)
    //                {
    //                    if (err)
    //                    {
    //                        result.code = 0;
    //                        result.msg = "save fail!";
    //                        saveResult(res, result);
    //                    }
    //                    else
    //                    {
    //                        result.code = 1;
    //                        result.msg = "success!";
    //                        saveResult(res, result);
    //                    }
    //                });
    //            }
    //            else
    //            {
    //                result.code = 0;
    //                result.msg = "a or b not found";
    //                saveResult(res, result);
    //            }
    //        }
    //    }
    //    else
    //    {
    //        result.code = 0;
    //        result.msg = "no user";
    //        saveResult(res, result);
    //    }
    //});
}
function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}