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
        if (req.user.role === "admin") {
            await clienSchema.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'Client deleted successfully' })
        }
        else {
            res.status(403).json({ message: 'you dont have permission for delete' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateClients = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const updatedClient = await clienSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ message: 'Client updated successfully', data: updatedClient })
        }
        else {
            res.status(403).json({ message: 'you dont have permission for update' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}