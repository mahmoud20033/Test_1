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
        const newWorker = await workerSchema.create(req.body);
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteWorker = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            await workerSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Worker deleted successfully' });
        }
        else {
            res.status(403).json({ message: 'you dont have permission for delete' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateWorker = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const updatedWorker = await workerSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: 'Worker updated successfully', data: updatedWorker });
        }
        else {
            res.status(403).json({ message: 'you dont have permission for update' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}