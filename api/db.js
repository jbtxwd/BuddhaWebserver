// JavaScript source code
var mongoose = require('mongoose'),
DB_URL = 'mongodb://localhost:27017/buddhism';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () 
{
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) 
{
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () 
{
});

module.exports = mongoose;