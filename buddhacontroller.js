var express = require("express");
var mongoose = require('mongoose');
var User = require("./user.js");

exports.addbuddha = function (req, res)//添加buddha
{
    var result = { "code": -1, "msg": "" };
    var _id = mongoose.Types.ObjectId(req.body._id);
    var buddhaid = req.body.buddhaid;
    User.findOne({ _id: _id }, function (err, doc)
    {
        if (doc !== null)
        {
            var buddhavalue = doc.buddhavalue;
            if (typeof (buddhavalue) != "undefined" && buddhavalue != "" && buddhavalue != null)
            {
                var jsonarray = JSON.parse(buddhavalue);
                for (i =0; i < jsonarray.length; i++)
                {
                    if (jsonarray[i].id == buddhaid)//已经有了
                    {
                        result.code = 0;
                        result.msg = "has same buddha!";
                        saveResult(res, result);
                        return;
                    }
                }
                var formdata = {};
                formdata.id = buddhaid;
                formdata.flower = 0;
                formdata.fruit = 0;
                formdata.cup = 0;
                formdata.incense = 0;
                formdata.position = jsonarray.length + 1;
                formdata.effect = 0;
                jsonarray.push(formdata);
                doc.buddhavalue = JSON.stringify(jsonarray);

                doc.save(function (err, doc1)
                {
                    if (err)
                    {
                        result.code = 0;
                        result.msg = "save fail!";
                        saveResult(res, result);
                    }
                    else
                    {
                        result.code = 1;
                        result.msg = "success!";
                        saveResult(res, result);
                    }
                });

            }
            else
            {
                var jsonarray = [];
                var formdata = {};
                formdata.id = buddhaid;
                formdata.flower = 0;
                formdata.fruit = 0;
                formdata.cup = 0;
                formdata.incense = 0;
                formdata.position = 1;
                formdata.effect = 0;
                jsonarray.push(formdata);
                console.log(JSON.stringify(jsonarray));
                doc.buddhavalue = JSON.stringify(jsonarray);
                doc.save(function (err, doc1)
                {
                    if (err)
                    {
                        result.code = 0;
                        result.msg = "save fail!";
                        saveResult(res, result);
                    } else
                    {
                        console.log(doc1);

                        result.code = 1;
                        result.msg = "success!";
                        saveResult(res, result);
                    }
                });
            }
        }
    });
}

function saveResult(res, data)
{
    res.status(200);
    res.json(data);
    res.end();
}