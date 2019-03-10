var config = require('./config/config');
var express = require('express');
var apiRouter=require('./router');
var bodyparser=require('body-parser');
var cluster=require('cluster');
var numcpus=require('os').cpus().length;
var http = require('http');
var https = require('https');
var fs = require('fs');
var app=express();
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var buddhacontroller = require('./api/buddhacontroller');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/', apiRouter);

require("./config/configcontroller").loadallconfig();//加载配置表

if(cluster.isMaster)
{
    console.log("master start....");
	for(var i=0;i<numcpus;i++){
		cluster.fork();
	}

	cluster.on('listening',function(worker,address){
		console.log('listening:worker'+worker.process.pid+',port:'+address.port);
	});

	cluster.on('exit',function(worker,address,signal){
		console.log('worker'+worker.process.pid +'died');
		cluster.fork();
	});
    scheduleCronstyle();//开启定时任务

}
else
{
	var server = app.listen(config.port, function () 
	{
  		var host = server.address().address;
  		var port = server.address().port;
  		console.log('app listening at http://%s:%s', host, port);
    });

    var privateKey = fs.readFileSync('./config/2_monster.j6game.com.key', 'utf8');
    var certificate = fs.readFileSync('./config/1_monster.j6game.com_bundle.crt', 'utf8');
    var credentials = { key: privateKey, cert: certificate };

    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(config.httpsport, function ()
    {
        console.log('HTTPS Server is running on: https');
    });

    //var httpsserver = https.createServer(
    //    {
    //        key:  fs.readFileSync(),
    //        cert: fs.readFileSync("./config/1_monster.j6game.com_bundle.crt")

    //    }, app.listen(config.httpsport, function ()
    //    {
    //        var host = httpsserver.address().address;
    //        var port = httpsserver.address().port;
    //        console.log('app listening at https://%s:%s', host, port);
    //    }));
}

function scheduleCronstyle()
{
    schedule.scheduleJob('1 0 2 * * *', function ()
    {
        console.log('scheduleCronstyle:' + new Date());
        buddhacontroller.reset();
    });
}

module.exports = app;