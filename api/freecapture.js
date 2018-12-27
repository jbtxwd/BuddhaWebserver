var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var FreeCaptureSchema = new Schema({
    userid: { type: mongoose.Types.ObjectId },//”√ªß’À∫≈
    nickname: { type: String },
    count: { type: Number }
});

module.exports = mongoose.model('FreeCapture', FreeCaptureSchema);