var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var WishSchema = new Schema(
    {
        playerid: { type: mongoose.Types.ObjectId },//”√ªß’À∫≈
        playername: { type: String },
        creattime: { type: Date, "default": Date.now },
        wishcontent: { type: String },
        buddhaid: { type: Number },
        wishid: { type: Number },
        ispublic: { type: Number },
        price: { type: Number }
    });

module.exports = mongoose.model('Wish', WishSchema);