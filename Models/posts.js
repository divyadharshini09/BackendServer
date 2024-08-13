const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Post', postSchema);
