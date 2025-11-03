const workerSchema = require('../Schemas/Worker')

exports.getallWorker = async (req, res) => {
    try {
        const workers = await workerSchema.find();
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createWorker = async (req, res) => {
       try {
            const worker = await workerSchema.create(req.body)
            res.status(201).json(worker)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

exports.deleteWorker = async (req, res) => {
    try {
        const { code } = req.params;

        // Find worker by code
        const worker = await workerSchema.findOne({ code });
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        await workerSchema.findByIdAndDelete(worker._id);
        res.status(200).json({ message: 'Worker deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateWorker = async (req, res) => {
    try {
        const { code } = req.params;
        const updateData = req.body;

        // Find the existing worker by code
        const existingWorker = await workerSchema.findOne({ code });
        if (!existingWorker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Update the worker using the MongoDB _id
        const updatedWorker = await workerSchema.findByIdAndUpdate(existingWorker._id, updateData, { new: true });
        res.status(200).json(updatedWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}