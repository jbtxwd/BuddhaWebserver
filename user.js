/**  �޸����� user.js
 * �û���Ϣ
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String},                    //�û��˺�
    password: { type: String },                        //����
    nickname: { type: String }, 
    userage: { type: Number },                        //����
    deviceid: { type: String },
    accounttype: { type: Number },
    displayname: { type: String },
    blessingscoin: { type: Number, "default":0 },
    virtue: { type: Number, "default":0 },
    templecount: { type: Number, "default":0},
    buddhavalue: { type: String },
    items: {type:String},
    logindate: { type: Date, "default": Date.now}                       //�����¼ʱ��
});

module.exports = mongoose.model('User', UserSchema);