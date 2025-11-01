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
        if (req.user.role === "admin") {
            await supplierSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Supplier deleted successfully' });
        }
        else {
            res.status(403).json({ message: 'you dont have permission for delete' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateSupplier = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const updatedSupplier = await supplierSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: 'Supplier updated successfully', data: updatedSupplier });
        }
        else {
            res.status(403).json({ message: 'you dont have permission for update' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}