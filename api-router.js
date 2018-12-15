var express = require('express');
var buddhacontroller = require('./buddhacontroller');
var config = require('./config');
var bodyParser = require('body-parser');
var app=express();
var router = express.Router();
var accountcontroller = require("./accountcontroller");

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
module.exports = router;