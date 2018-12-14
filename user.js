/**  �޸����� user.js
 * �û���Ϣ
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String},                    //�û��˺�
    userpwd: { type: String },                        //����
    userage: { type: Number },                        //����
    logindate: { type: Date, "default": Date.now}                       //�����¼ʱ��
});

module.exports = mongoose.model('User', UserSchema);