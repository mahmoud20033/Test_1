const clienSchema = require('../Schemas/Client')

exports.getallClients = async (req, res) => {
    try {
        const clients = await clienSchema.find()
        res.status(200).json(clients)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.createClients = async (req, res) => {
    try {
        const client = await clienSchema.create(req.body)
        res.status(201).json(client)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteClients = async (req, res) => {
    try {
        // Find client by code since that's what's used in the route
        const client = await clienSchema.findOne({ code: req.params.code });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await clienSchema.findByIdAndDelete(client._id);
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateClients = async (req, res) => {
    try {
        const { code } = req.params;
        const updateData = req.body;

        // Find the existing client by code
        const existingClient = await clienSchema.findOne({ code });
        if (!existingClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Update the client using the MongoDB _id
        const updatedClient = await clienSchema.findByIdAndUpdate(existingClient._id, updateData, { new: true });
        res.status(200).json({ message: 'Client updated successfully', data: updatedClient });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}