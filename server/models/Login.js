const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
})

const LoginModel = mongoose.model('signup', LoginSchema)
module.exports = LoginModel