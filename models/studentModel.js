const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    reg_no: {
        type: String,
        required: true
    },
    stclass: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('students', StudentSchema);