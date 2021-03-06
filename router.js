var express = require('express');
var bodyParser = require('body-parser');
var app=express();
var router = express.Router();
var config = require('./config/config');
var buddhacontroller = require('./api/buddhacontroller');
var usercontroller = require("./api/usercontroller");
var itemcontroller = require("./api/itemcontroller");
var wishcontroller = require("./api/wishcontroller");
var freecapturecontroller = require("./api/freecapturecontroller");
router.get('/test', function (req, res)
{
	console.log("test ok");
	res.send('test ok');
});

router.post('/account/regist', function (req, res)
{
	usercontroller.regist(req,res);
});

router.post('/account/login', function (req, res)
{
    usercontroller.login(req, res);
});

router.post('/account/accountdetail', function (req, res)
{
    usercontroller.accountdetail(req, res);
});

router.post('/user/recharge', function (req, res)
{
    usercontroller.recharge(req, res);
});

router.post('/user/changenickname', function (req, res)
{
    usercontroller.changenickname(req, res);
});

router.post('/buddha/addbuddha', function (req, res)
{
    buddhacontroller.addbuddha(req, res);
});

router.post('/buddha/changeposition', function (req, res)
{
    buddhacontroller.changeposition(req, res);
});

router.post('/buddha/worship', function (req, res)
{
    buddhacontroller.worship(req, res);
});

router.post('/buddha/totalrank', function (req, res)
{
    buddhacontroller.totalrank(req, res);
});

router.post('/item/buy', function (req, res)
{
    itemcontroller.buy(req, res);
});

router.post('/item/use', function (req, res)
{
    itemcontroller.use(req, res);
});

router.post('/wish/make', function (req, res)
{
    wishcontroller.make(req, res);
});

router.post('/wish/get', function (req, res)
{
    wishcontroller.get(req, res);
});

router.post('/freecapture/freecapture', function (req, res)
{
    freecapturecontroller.freecapture(req, res);
});

router.post('/freecapture/getrank', function (req, res) {
    freecapturecontroller.getrank(req, res);
});

module.exports = router;