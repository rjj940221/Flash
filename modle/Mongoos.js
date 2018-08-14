const mongoose = require('mongoose');


module.exports = () => {
    return mongoose
        .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017')
        .then(() => {
            console.log('Connected to MongoDB');
        });
};