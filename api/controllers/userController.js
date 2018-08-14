'use strict';
const bcrypt = require('bcrypt');
const userSchema = require('../../modle/userSchema');
const jwt = require('jsonwebtoken');


module.exports = {
    login: login,
    createUser: createUser
};


function login(req, res) {

    if (req.swagger.params.userLogin) {
        let logIn = req.swagger.params.userLogin.value;
        userSchema.findOne({employeeID: logIn.employeeID}).then(data => {
            console.log(data);
            return new Promise((resolve, reject) => {
                bcrypt.compare(logIn.password, data.password, function (err, res) {
                    if (res) {
                        return resolve(data);
                    } else {
                        return reject("Miss matching credentials");
                    }
                });
            });
        }).then(data => {
            let token = jwt.sign({admin: data.admin, employeeID: data.employeeID}, 'VerySecretSecret');
            return res.json({
                firstName: data.firstName,
                surname: data.surname,
                email: data.email,
                cellNumber: data.cellNumber,
                token: token
            });
        }).catch(err => {
            console.error(err);
            res.sendStatus(401);
        });
    } else {
        res.stat(422);
        res.json({message: "Missing parameters"})
    }
}

function createUser(req, res) {

    if (req.swagger.params.newUser) {
        let newUser = req.swagger.params.newUser.value;

        bcrypt.hash(newUser.password, 10, function (err, password) {
            let user = new userSchema({
                admin: newUser.admin || false,
                firstName: newUser.firstName,
                surname: newUser.surname,
                email: newUser.email,
                cellNumber: newUser.cellNumber,
                password: password,
                employeeID: newUser.employeeID,
                projectCodes: newUser.projectCodes
            });

            user.save().then(data => {
                console.log(data);
                res.status(201);
                res.json({
                    employeeID: data.employeeID,
                    _id: data._id
                });
            }, err => {
                console.error(err);
                res.status(500);
                res.json({message: "Failed to create user"})
            })
        });

    }

}