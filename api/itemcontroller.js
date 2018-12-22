var express = require("express");
var mongoose = require('mongoose');
var User = require("./user.js");
var Item = require("./item.js");
var User = require("./user.js");
var configcontroller = require("../config/configcontroller");
exports.buy = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var itemid = req.body.itemid;
    var count = req.body.count;
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
        User.findOne({ "_id": _id }, function (err, doc)
        {
            if (doc != null)
            {
                var totalprice = item.Price * count;
                if (doc.blessingscoin >= totalprice)//钱够 正常购买
                {
                    var conditions = { playerid: _id, itemid: itemid };
                    var updates = { $inc: { count: count } };
                    Item.findOneAndUpdate(conditions, updates, function (err1, doc1)
                    {
                        if (doc1 == null)
                        {
                            var newitem = new Item();
                            newitem.itemid = itemid;
                            newitem.playerid = _id;
                            newitem.count = count;
                            newitem.save();
                        }
                        doc.blessingscoin -= totalprice;
                        doc.save();
                        result.code = 0;
                        result.msg = "buy item sucess";
                        result.blessingscoin = doc.blessingscoin;
                        saveResult(res, result);
                    });
                }
                else
                {
                    result.code = 1;
                    result.msg = "coin not enough";
                    saveResult(res, result);
                }
            }
            else
            {
                result.code = 2;
                result.msg = "no user";
                saveResult(res, result);
            }
        });
    }
    else//找不到对应的物体
    {
        result.code = 3;
        result.msg = "no item";
        saveResult(res, result);
    }
}

exports.use = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var itemid = req.body.itemid;
    var buddhaid = req.body.buddhaid;

    var conditions = { playerid: _id, itemid: itemid, count: { $gte: 1 } };
    var updates = { $inc: { count: -1 } };
    Item.findOneAndUpdate(conditions, updates, function (err, doc)
    {
        if (doc != null)
        {
            result.code = 0;
            result.msg = "use item sucess";
            saveResult(res, result);
        }
        else
        {
            result.code = 1;
            result.msg = "no item=" + itemid;
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