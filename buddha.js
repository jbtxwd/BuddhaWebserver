var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var BuddhaSchema = new Schema({
    buddhaid: { type: Number },
    playerid: { type: mongoose.Types.ObjectId },//”√ªß’À∫≈
    playername: { type: String },
    flower: { type: Number },
    fruit: { type: Number },
    cup: { type: Number },
    incense: { type: Number },
    position: { type: Number },
    effect: { type: Number }
});

module.exports = mongoose.model('Buddha', BuddhaSchema);