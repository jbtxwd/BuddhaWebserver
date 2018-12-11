var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var app=express();
var router = express.Router();
var accountcontroller = require("./api/accountcontroller");

router.get('/test',function(req,res){
	console.log("test ok");
	res.send('test ok');
});

router.post('/account/regist',function(req,res){
	console.log('start regist'); 
	accountcontroller.regist(req,res);
});
module.exports = router;