const UserSurvey = require("../Models/userSurvey");
const Survey = require('../Models/Survey');

// Get all surveys
async function getAllSurveys(req, res) {
    try {
        const allSurveys = await Survey.find();
        res.json(allSurveys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// Take a survey
async function takeSurvey(req, res) {
	const { userId, surveyId, answers } = req.body;

	try {
		const userSurvey = new UserSurvey({
			user: userId,
			surveyId,
			answers,
		});

		const savedUserSurvey = await userSurvey.save();
		res.status(201).json(savedUserSurvey);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

// Mark a survey as completed
async function markSurveyCompleted(req, res) {
	const { userSurveyId } = req.params;

	try {
		const updatedUserSurvey = await UserSurvey.findByIdAndUpdate(
			userSurveyId,
			{ completed: true },
			{ new: true }
		);

		res.json(updatedUserSurvey);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

// Reset answers for a survey
async function resetSurveyAnswers(req, res) {
	const { userSurveyId } = req.params;

	try {
		const updatedUserSurvey = await UserSurvey.findByIdAndUpdate(
			userSurveyId,
			{ answers: [], completed: false },
			{ new: true }
		);

		res.json(updatedUserSurvey);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

module.exports = {
	getAllSurveys,
	takeSurvey,
	markSurveyCompleted,
	resetSurveyAnswers,
};
