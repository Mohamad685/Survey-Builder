const express = require ('express');
const surveyController = require ('../Controllers/surveyController');
const router = express.Router();

router.post('/surveys',surveyController.createSurvey);
router.get('/surveys',surveyController.getAllSurveys);
router.put('/surveys/:id',surveyController.updateSurvey);
router.delete('/surveys/:id',surveyController.deleteSurvey);

module.exports = router;