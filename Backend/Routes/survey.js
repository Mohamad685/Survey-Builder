const express = require('express');
const router = express.Router();
const surveyController = require('../Controllers/surveyController');

// Route to create a new survey
router.post('/surveys', surveyController.createSurvey);

// Route to get all surveys
router.get('/surveys', surveyController.getAllSurveys);

// Route to update survey details
router.put('/surveys/:surveyId', surveyController.updateSurvey);

// Route to delete a survey
router.delete('/surveys/:surveyId', surveyController.deleteSurvey);

module.exports = router;
