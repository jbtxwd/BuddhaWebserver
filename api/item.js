var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    itemid: { type: Number },
    playerid: { type: mongoose.Types.ObjectId },//�û��˺�
    count: { type: Number }
});

module.exports = mongoose.model('Item', ItemSchema);
