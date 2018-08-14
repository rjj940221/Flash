const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const workCodeSchema = new Schema({
    projectCode: {type: String, required: true},
    workCode: {type: String, required: true},
    createDate: {type: Date, default: Date.now}
});

workCodeSchema.index({"projectCode": 1, "workCode": 1}, {"unique": true});
workCodeSchema.index({"projectCode": 1});

module.exports = mongoose.model('workCodeSchema', workCodeSchema);