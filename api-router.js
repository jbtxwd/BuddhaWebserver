var express = require('express');
var buddhacontroller = require('./buddhacontroller');
var config = require('./config');
var bodyParser = require('body-parser');
var app=express();
var router = express.Router();
var accountcontroller = require("./accountcontroller");
var itemcontroller = require("./api/itemcontroller");
router.get('/test',function(req,res){
	console.log("test ok");
	res.send('test ok');
});

router.post('/account/regist',function(req,res){
	console.log('start regist'); 
	accountcontroller.regist(req,res);
});

router.post('/account/login', function (req, res)
{
    console.log('start login');
    accountcontroller.login(req, res);
});

router.post('/account/accountdetail', function (req, res)
{
    console.log('start accountdetail');
    accountcontroller.accountdetail(req, res);
});

router.post('/buddha/addbuddha', function (req, res)
{
    console.log('start addbuddha');
    buddhacontroller.addbuddha(req, res);
});

router.post('/buddha/changeposition', function (req, res)
{
    console.log('start changeposition');
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

//router.post('/buddha/dailyrank', function (req, res)
//{
//    buddhacontroller.dailyrank(req, res);
//});

router.post('/item/buy', function (req, res)
{
    console.log('start item buy');
    itemcontroller.buy(req, res);
});

router.post('/item/use', function (req, res)
{
    itemcontroller.use(req, res);
});
module.exports = router;