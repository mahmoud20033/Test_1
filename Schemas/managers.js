const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managers = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    workerSupervisorName: { type: String, required: true },
    storeSupervisorName: { type: String, required: true }
});

module.exports = mongoose.model('managers', managers);
