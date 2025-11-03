const managerSchema = require('../Schemas/managers')

exports.getallmanager = async (req, res) => {
    try {
        const managers = await managerSchema.find();
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createmanager = async (req, res) => {
    try {
        // Validate required fields
        const { code, workerSupervisorName, storeSupervisorName } = req.body;
        if (!code || !workerSupervisorName || !storeSupervisorName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for duplicate code
        const existingManager = await managerSchema.findOne({ code });
        if (existingManager) {
            return res.status(400).json({ message: 'Manager with this code already exists' });
        }

        const newManager = await managerSchema.create(req.body);
        res.status(201).json(newManager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deletemanager = async (req, res) => {
    try {
        const { code } = req.params;

        // Find manager by code
        const manager = await managerSchema.findOne({ code });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        await managerSchema.findByIdAndDelete(manager._id);
        res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updatemanager = async (req, res) => {
    try {
        const { code } = req.params;
        const updateData = req.body;

        // Find the existing manager by code
        const existingManager = await managerSchema.findOne({ code });
        if (!existingManager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        // Update the manager using the MongoDB _id
        const updatedManager = await managerSchema.findByIdAndUpdate(existingManager._id, updateData, { new: true });
        res.status(200).json(updatedManager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}