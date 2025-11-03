const workerSupervisorSchema = require('../Schemas/WorkerSupervisor')

exports.getallWorkerSupervisor = async (req, res) => {
    try {
        const workerSupervisors = await workerSupervisorSchema.find();
        res.status(200).json(workerSupervisors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createWorkerSupervisor = async (req, res) => {
    try {
        const newWorkerSupervisor = await workerSupervisorSchema.create(req.body);
        res.status(201).json(newWorkerSupervisor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteWorkerSupervisor = async (req, res) => {
    try {
        await workerSupervisorSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Worker Supervisor deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateWorkerSupervisor = async (req, res) => {
    try {
        const updatedWorkerSupervisor = await workerSupervisorSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Worker Supervisor updated successfully', data: updatedWorkerSupervisor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}