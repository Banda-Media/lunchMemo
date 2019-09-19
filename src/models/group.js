const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    groupSize: String,
    startTime: String,
    endTime: String,
    active: {
        type: Boolean,
        default: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group