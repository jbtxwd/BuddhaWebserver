var mongoose = require('./../db.js'),
    Schema = mongoose.Schema;

var WishSchema = new Schema(
    {
        playerid: { type: mongoose.Types.ObjectId },//”√ªß’À∫≈
        creattime: { type: Date, "default": Date.now },
        wishcontent: { type: String },
        buddhaid: { type: Number },
        wishid: { type: Number },
        ispublic: { type: Number }
    });

module.exports = mongoose.model('Wish', WishSchema);