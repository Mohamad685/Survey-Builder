// routes/userSurveyRoutes.js

const express = require('express');
const router = express.Router();
const userSurveyController = require('../Controllers/userSurveyController');

// Get all surveys for a user
router.get('/username/:userId/surveys', userSurveyController.getUserSurveys);

// Take a survey
router.post('/username/take-survey', userSurveyController.takeSurvey);

// Mark a survey as completed
router.put('/username/mark-completed/:userSurveyId', userSurveyController.markSurveyCompleted);

// Reset answers for a survey
router.put('/username/reset-answers/:userSurveyId', userSurveyController.resetSurveyAnswers);

module.exports = router;
