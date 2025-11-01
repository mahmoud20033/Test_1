const storeSupervisorSchema = require('../Schemas/StoreSupervisor')

exports.getallStoreSupervisor = async (req, res) => {
    try {
        const storeSupervisors = await storeSupervisorSchema.find();
        res.status(200).json(storeSupervisors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createStoreSupervisor = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const newStoreSupervisor = await storeSupervisorSchema.create(req.body);
            res.status(201).json(newStoreSupervisor);
        }
        else {
            res.status(403).json({ message: 'you dont have permission for create' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteStoreSupervisor = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            await storeSupervisorSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Store Supervisor deleted successfully' });
        }
        else {
            res.status(403).json({ message: 'you dont have permission for delete' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateStoreSupervisor = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const updatedStoreSupervisor = await storeSupervisorSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: 'Store Supervisor updated successfully', data: updatedStoreSupervisor });
        }
        else {
            res.status(403).json({ message: 'you dont have permission for update' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}