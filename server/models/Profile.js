const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    photo: String
})

const ProfileModel = mongoose.model('profile', ProfileSchema)
module.exports = ProfileModel;