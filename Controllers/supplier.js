const supplierSchema = require('../Schemas/Supplier')

exports.getallSupplier = async (req, res) => {
    try {
        const suppliers = await supplierSchema.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createSupplier = async (req, res) => {
    try {
        const newSupplier = await supplierSchema.create(req.body);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteSupplier = async (req, res) => {
    try {
        // Find supplier by code since that's what's used in the route
        const supplier = await supplierSchema.findOne({ code: req.params.code });
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        
        await supplierSchema.findByIdAndDelete(supplier._id);
        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateSupplier = async (req, res) => {
    try {
        const { code } = req.params;
        const updateData = req.body;
        
        // Find the existing supplier by code
        const existingSupplier = await supplierSchema.findOne({ code });
        if (!existingSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        
        // Update the supplier using the MongoDB _id
        const updatedSupplier = await supplierSchema.findByIdAndUpdate(existingSupplier._id, updateData, { new: true });
        res.status(200).json({ message: 'Supplier updated successfully', data: updatedSupplier });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}