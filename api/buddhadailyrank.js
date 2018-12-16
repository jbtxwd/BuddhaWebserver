var mongoose = require('./../db.js'),
    Schema = mongoose.Schema;

var BuddhaDailyRankSchema = new Schema({
    buddhaid: { type: Number },
    playerid: { type: mongoose.Types.ObjectId },//�û��˺�
    playername: { type: String },
    effect: { type: Number }
});

module.exports = mongoose.model('BuddhaDailyRank', BuddhaDailyRankSchema);