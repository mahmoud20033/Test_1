const scrapSchema = require('../Schemas/ScrapStore')

exports.getallScrap = async (req, res) => {
    try {
        const scraps = await scrapSchema.find();
        res.status(200).json(scraps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createScrap = async (req, res) => {
    try {
        const newScrap = await scrapSchema.create(req.body);
        res.status(201).json(newScrap);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteScrap = async (req, res) => {
    try {
        // Use code instead of id to match the frontend expectation
        await scrapSchema.findOneAndDelete({ code: req.params.code });
        res.status(200).json({ message: 'Scrap deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateScrap = async (req, res) => {
    try {
        // Use code instead of id to match the frontend expectation
        const updatedScrap = await scrapSchema.findOneAndUpdate(
            { code: req.params.code },
            req.body,
            { new: true }
        );
        res.status(200).json({ message: 'Scrap updated successfully', data: updatedScrap });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}