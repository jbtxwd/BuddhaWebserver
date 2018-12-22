var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    itemid: { type: Number },
    playerid: { type: mongoose.Types.ObjectId },//”√ªß’À∫≈
    count: { type: Number }
});

module.exports = mongoose.model('Item', ItemSchema);
