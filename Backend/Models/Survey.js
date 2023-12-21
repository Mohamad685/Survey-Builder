const mongoose = require('mongoose');

const answerChoiceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['input', 'radio', 'checkbox'],
    required: true,
  },
  answerChoices: [answerChoiceSchema], // Applicable for radio and checkbox types
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
