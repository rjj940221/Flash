'use strict';

let SwaggerExpress = require('swagger-express-mw');
let app = require('express')();
let mongoose = require('./modle/Mongoos');
module.exports = app; // for testing

let config = {
    appRoot: __dirname // required config
};

mongoose().then(() => {

    SwaggerExpress.create(config, function (err, swaggerExpress) {
        if (err) {
            throw err;
        }

        // install middleware
        swaggerExpress.register(app);

        let port = process.env.PORT || 9000;
        app.listen(port);

        if (swaggerExpress.runner) {
            console.log('app started');
        }
    });
});
