const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workerSchema = new mongoose.Schema({
  code: { type: Number, required: true, unique: true },
  workerName: { type: String, required: true },
  rawMaterialAmount: { type: Number, required: true },
  workerSupervisorName: { type: String, required: true },
});

module.exports = mongoose.model("Worker", workerSchema);