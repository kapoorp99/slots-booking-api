const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        default: "Free"
    },
    slotTime:{
        type: String,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Forum', forumSchema);