const { Schema, model } = require('mongoose');

const computerSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        a: {
            type: String,
            required: true
        },
        b: {
            type: String,
            required: true
        },
        c: {
            type: String,
            required: true
        },
        d: {
            type: String,
            required: true
        }
    },
    answer: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    form: {
        type: String,
        required: true
    }
});

const Computer = model('Computer', computerSchema);

module.exports = Computer;
