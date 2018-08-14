const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const timeLogSchema = new Schema({
    employeeID: {type: String, required: true},
    projectCode: {type: String, required: true},
    workCode: {type: String, required: true},
    date: {type: Date, default: Date.now},
    hoursWorked: 0,
    comment: {type: String, default: ""},
    billable: String,
    status: {type: String, default: "SAVED"} //SAVED, POSTED, FINALISED
});

module.exports = mongoose.model('timeLogSchema', timeLogSchema);