const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new mongoose.Schema({
    code: { type: Number, required: true, unique: true },
    supplierName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dueAmount: { type: Number, required: true },
    scrapAmountInTons: { type: Number, required: true }
});

module.exports = mongoose.model('Supplier', supplierSchema);
