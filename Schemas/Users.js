const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    permissions: {
        Manager: { type: Boolean, default: false },
        Dashboard: { type: Boolean, default: false },
        Foreman_Supervisor: { type: Boolean, default: false },
        Store_Supervisor: { type: Boolean, default: false },
        Workers: { type: Boolean, default: false },
        Scrapstore: { type: Boolean, default: false },
        Rawmaterial: { type: Boolean, default: false },
        Suppliers: { type: Boolean, default: false },
        Clients: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model("User", userSchema);