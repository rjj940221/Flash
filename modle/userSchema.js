const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    admin: {type: Boolean, default: false},
    firstName: String,
    surname: String,
    email: String,
    cellNumber: String,
    password: String,
    employeeID: {type: String, required: true, unique: true},
    createDate: {type: Date, default: Date.now},
    projectCodes: {type: Array, default: []}
});

module.exports = mongoose.model('userSchema', userSchema);