'use strict';
const userSchema = require('../../modle/userSchema');
const workCodeSchema = require('../../modle/workCodeSchema');
const timLogSchema = require('../../modle/timeLogSchema');

module.exports = {
    getProjectCodes: getProjectCodes,
    getWorkCodes: getWorkCodes,
    getTimeLog: getTimeLog,
    addTimeLog: addTimeLog
};

function getProjectCodes(req, res) {
    if (req.swagger.params.employeeID) {
        return userSchema.findOne({employeeID: req.swagger.params.employeeID.value}, 'projectCodes', (err, data) => {
            if (err) {
                console.error(err.message);
                return res.sendStatus(500);
            }
            return res.json(data.projectCodes)
        });
    }
}

function getWorkCodes(req, res) {
    if (req.swagger.params.projectCode) {

        let workcodes = [];
        return workCodeSchema.find({projectCode: req.swagger.params.projectCode.value}, 'workCode', (err, data) => {
            if (err) {
                console.error(err.message);
                return res.sendStatus(500);
            }
            workcodes = data.map((workCode) => workCode.workCode);
            return res.json(workcodes)
        });
    }
}

function getTimeLog(req, res) {
    if (req.swagger.params.emplyeeID) {

        timLogSchema.find({emplyeeID: req.swagger.params.emplyeeID.value}, '_id emplyeeID projectCode workCode status hoursWorked billable date coment', (err, data) => {
            if (err) {
                console.error(err.message);
                return res.sendStatus(500);
            }
            console.log(data);
            res.json(data);
        })
    }
}

function addTimeLog(req, res) {
    if (req.swagger.params.timeLog && req.swagger.params.emplyeeID) {
        let timeLog = req.swagger.params.timeLog.value;
        let log = new timLogSchema({
            employeeID: req.swagger.params.emplyeeID.value,
            projectCode: timeLog.projectCode,
            workCode: timeLog.workCode,
            hoursWorked: timeLog.hoursWorked,
            billable: timeLog.billable
        });

        if (timeLog.data) {
            log.date = timeLog.data;
        }

        if (timeLog.comment){
            log.comment = timeLog.comment;
        }

        log.save((err, timeLog) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log()
            res.status(201);
            res.json({
                employeeID: timeLog.employeeID,
                _id: timeLog._id
            });
        });
    }
}