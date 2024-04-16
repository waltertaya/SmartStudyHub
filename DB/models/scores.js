const { Schema, model } = require('mongoose');


const scoresSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    avgscore: {
        type: Number,
        required: true
    },
    testtaken: {
        type: Number,
        required: true
    }
});

const Scores = model('Scores', scoresSchema);

module.exports = Scores;
