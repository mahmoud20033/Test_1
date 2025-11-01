const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapStoreSchema = new mongoose.Schema({
  code: { type: Number, required: true, unique: false },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  costPerTon: { type: Number, required: true },
  supplierName: { type: String, required: true },
  receiverName: { type: String, required: true },
  receivingDate: { type: Date, required: true },
});

module.exports = mongoose.model("ScrapStore", scrapStoreSchema);
