const Survey = require("../Models/Survey");

// Controller to create a new survey
const createSurvey = async (req, res) => {
	try {
		const survey = new Survey(req.body);
		const savedSurvey = await survey.save();
		res.json(savedSurvey);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to get all surveys
const getAllSurveys = async (req, res) => {
	try {
		const surveys = await Survey.find();
		res.json(surveys);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to delete a survey
const deleteSurvey = async (req, res) => {
	try {
		const { surveyId } = req.params;

		const deletedSurvey = await Survey.findByIdAndRemove(surveyId);

		if (!deletedSurvey) {
			return res.status(404).json({ message: "Survey not found" });
		}

		res.json({ message: "Survey deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to update survey details
const updateSurvey = async (req, res) => {
	try {
		const { surveyId } = req.params;
		const { title, questions } = req.body;

		const updatedSurvey = await Survey.findByIdAndUpdate(
			surveyId,
			{ $set: { title, questions } },
			{ new: true }
		);

		if (!updatedSurvey) {
			return res.status(404).json({ message: "Survey not found" });
		}

		res.json(updatedSurvey);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createSurvey,
	getAllSurveys,
	deleteSurvey,
	updateSurvey,
};
