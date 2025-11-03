const materialSchema = require('../Schemas/RawMaterialStore')

exports.getallMaterial = async (req, res) => {
    try {
        const materials = await materialSchema.find()
        res.status(200).json(materials)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.createMaterial = async (req, res) => {
    try {
        // Validate required fields
        const { code, name, quantity, expense, costPerTon, exportDate, sorting, workerName, workerSupervisorName, storeSupervisorName } = req.body;
        if (!code || !name || !quantity || !expense || !costPerTon || !exportDate || !sorting || !workerName || !workerSupervisorName || !storeSupervisorName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for duplicate code
        const existingMaterial = await materialSchema.findOne({ code });
        if (existingMaterial) {
            return res.status(400).json({ message: 'Material with this code already exists' });
        }

        const materials = await materialSchema.create(req.body)
        res.status(201).json(materials)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteMaterial = async (req, res) => {
    try {
        const { code } = req.params;

        // Find material by code
        const material = await materialSchema.findOne({ code });
        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }

        await materialSchema.findByIdAndDelete(material._id);
        res.status(200).json({ message: 'Material deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateMaterial = async (req, res) => {
    try {
        const { code } = req.params;
        const updateData = req.body;

        // Find the existing material by code
        const existingMaterial = await materialSchema.findOne({ code });
        if (!existingMaterial) {
            return res.status(404).json({ message: 'Material not found' });
        }

        // Update the material using the MongoDB _id
        const updatedMaterial = await materialSchema.findByIdAndUpdate(existingMaterial._id, updateData, { new: true });
        res.status(200).json(updatedMaterial);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}