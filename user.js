/**  修改上述 user.js
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String},                    //用户账号
    password: { type: String },                        //密码
    nickname: { type: String, "default": "游客"}, 
    userage: { type: Number },                        //年龄
    deviceid: { type: String },
    accounttype: { type: Number },
    displayname: { type: String },
    blessingscoin: { type: Number, "default":0 },
    virtue: { type: Number, "default":0 },
    templecount: { type: Number, "default":0},
    logindate: { type: Date, "default": Date.now}                       //最近登录时间
});

module.exports = mongoose.model('User', UserSchema);