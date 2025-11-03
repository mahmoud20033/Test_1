const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    code: { type: Number, required: true, unique: true },
    clientName: { type: String, required: true },
    quantity: { type: Number, required: true },
    receivingDate: { type: Date, required: true },
})

module.exports = mongoose.model('Client', clientSchema);