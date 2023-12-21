const mongoose = require('mongoose');

const userSurveySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey.questions',
        required: true,
      },
      selectedChoices: [String],
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
});

const UserSurvey = mongoose.model('UserSurvey', userSurveySchema);

module.exports = UserSurvey;
