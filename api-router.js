var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var app=express();
var router = express.Router();
var accountcontroller = require("./accountcontroller");

router.get('/test',function(req,res){
	console.log("test ok");
	res.send('test ok');
});

router.get('/account/regist',function(req,res){
	console.log('start regist'); 
	accountcontroller.regist(req,res);
});


router.get('/account/test',function(req,res){
	console.log('start test'); 
	accountcontroller.test(req,res);
});
module.exports = router;