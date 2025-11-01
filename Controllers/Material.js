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
        const materials = await materialSchema.create(req.body)
        res.status(201).json(materials)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}

exports.deleteMaterial = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            await materialSchema.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'Material deleted successfully' })
        }
        else {
            res.status(403).json({ message: 'you dont have permission for delete' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateMaterial = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const updatedMaterial = await materialSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ message: 'Material updated successfully', data: updatedMaterial })
        }
        else {
            res.status(403).json({ message: 'you dont have permission for update' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}