const mongoose = require("mongoose");

const surveySchema= new mongoose.Schema({
    title: String,
    questions:[
        {
            questionText: String,
            answerType: String,
            choices: [String],
        },
    ],
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;