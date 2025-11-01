const mongoose = require('mongoose');
const Schema = mongoose.Schema

const rawMaterialStoreSchema = new mongoose.Schema({
    code: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    expense: { type: Number, required: true },
    costPerTon: { type: Number, required: true },
    exportDate: { type: Date, required: true },
    sorting: { type: String, required: true },
    workerName: { type: String, required: true },
    workerSupervisorName: { type: String, required: true },
    storeSupervisorName: { type: String, required: true }
});

module.exports = mongoose.model('RawMaterialStore', rawMaterialStoreSchema);
