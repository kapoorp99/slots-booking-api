const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Free"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Forum', forumSchema);