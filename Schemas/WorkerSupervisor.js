const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSupervisorSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    workerSupervisorName: { type: String, required: true },
    storeSupervisorName: { type: String, required: true }
});

module.exports = mongoose.model('WorkerSupervisor', workerSupervisorSchema);
