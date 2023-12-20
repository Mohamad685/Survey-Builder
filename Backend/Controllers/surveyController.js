const Survey = require("../Models/Survey");

exports.createSurvey = async (req, res) => {
	try {
		const { title, questions } = req.body;
		const newSurvey = new Survey({ title, questions });
		const savedSurvey = await newSurvey.save();
		res.json(savedSurvey);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllSurveys = async (req, res) => {
	try {
		const surveys = await Survey.find();
		res.json(surveys);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateSurvey = async (req, res) => {
	try {
		const { title, questions } = req.body;
		const updateSurvey = await Survey.findByIdAndUpdate(
			req.params.id,
			{ title, questions },
			{ new: true }
		);
		res.json(updateSurvey);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteSurvey = async(req, res) => {
    try{
        const survey=await Survey.findByIdAndRemove(req.params.id);
        res.json({message: 'Survey deleted successfully'});
    }catch (error){
        res.status(500).json({ error: error.message });

    }
};
