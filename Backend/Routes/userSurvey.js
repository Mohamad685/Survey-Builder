const express = require('express');
const router = express.Router();
const userSurveyController = require('../Controllers/userSurveyController');

// Get all surveys for a user
router.get('/surveys', userSurveyController.getAllSurveys);

// Take a survey
router.post('/take-survey', userSurveyController.takeSurvey);

// Mark a survey as completed
router.put('/mark-completed/:userSurveyId', userSurveyController.markSurveyCompleted);

// Reset answers for a survey
router.put('/reset-answers/:userSurveyId', userSurveyController.resetSurveyAnswers);

module.exports = router;
