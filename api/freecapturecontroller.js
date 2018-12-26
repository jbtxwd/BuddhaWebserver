var express = require("express");
var mongoose = require('mongoose');
var User = require("./user.js");
var Item = require("./item.js");
var User = require("./user.js");
var FreeCapture = require("./freecapture.js");
var configcontroller = require("../config/configcontroller");

exports.freecapture = function (req, res)
{
    var result = { "code": 0, "msg": "" };
    var userid = mongoose.Types.ObjectId(req.body.userid);
    var animalid = req.body.animalid;
    var buycount = req.body.buycount;
    var buyprice = null;

    var freecaptureconfig = configcontroller.getanimalconfig();
    var freecapture = null;
    for (i = 0; i < freecaptureconfig.length; i++)
    {
        if (freecaptureconfig[i].ID == animalid)
        {
            freecapture = freecaptureconfig[i];
            var price = freecapture.Price.split("@");
            for(j = 0; j < price.length; j++)
            {
                var detail = price[j].split(",");
                var count = detail[0];
                if (count == buycount)
                {
                    buyprice = detail[1];
                }
            }
        }
    }

    if (freecapture != null && buyprice != null)
    {
        User.findOne({ "_id": userid }, function (err, doc)
        {
            if (doc != null)
            {
                if (doc.blessingscoin >= buyprice)//钱够 正常购买
                {
                    var conditions = { userid: userid};
                    var updates = { $inc: { count: buycount } };
                    FreeCapture.findOneAndUpdate(conditions, updates, function (err1, doc1)
                    {
                        if (doc1 == null)
                        {
                            var newfreecapture = new FreeCapture();
                            newfreecapture.userid = userid;
                            newfreecapture.count = buycount;
                            newfreecapture.save();
                        }
                        doc.blessingscoin -= buyprice;
                        doc.save();
                        result.code = 0;
                        result.msg = "freecapture sucess";
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
        result.msg = "no freecapture";
        saveResult(res, result);
    }
}
function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}