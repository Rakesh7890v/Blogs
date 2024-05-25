const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    photo: String,
    name: String,
    title: String,
    content: String,
    likes: { type: Number, default: 0 }
})

const BlogModel = mongoose.model('blog', BlogSchema)
module.exports = BlogModel