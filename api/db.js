// JavaScript source code
var mongoose = require('mongoose'),
DB_URL = 'mongodb://localhost:27017/buddhism';

/**
 * ����
 */
mongoose.connect(DB_URL);

/**
  * ���ӳɹ�
  */
mongoose.connection.on('connected', function () 
{
});

/**
 * �����쳣
 */
mongoose.connection.on('error', function (err) 
{
});

/**
 * ���ӶϿ�
 */
mongoose.connection.on('disconnected', function () 
{
});

module.exports = mongoose;