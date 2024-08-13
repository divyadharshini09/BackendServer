const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mutualFriends: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
