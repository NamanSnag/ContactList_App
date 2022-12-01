const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

const Contact = mongoose.model('Contact', Schema);

module.exports = Contact;
console.log('contact model');