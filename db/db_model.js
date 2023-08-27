const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
    operation:{
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
})

const history = mongoose.model("history", calculatorSchema);

module.exports = history;