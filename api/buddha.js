var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var BuddhaSchema = new Schema({
    buddhaid: { type: Number },
    playerid: { type: mongoose.Types.ObjectId },//�û��˺�
    playername: { type: String },
    flower: { type: Number },
    fruit: { type: Number },
    cup: { type: Number },
    incense: { type: Number },
    position: { type: Number },
    effect: { type: Number, "default": 0  },
    dailyeffect: { type: Number, "default": 0 }
});

module.exports = mongoose.model('Buddha', BuddhaSchema);