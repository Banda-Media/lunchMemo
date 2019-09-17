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
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    _users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, {
    timestamps: true
})

groupSchema.virtual('creator', {
    ref: 'User',
    localField: '_creator',
    foreignField: 'creator'
})

groupSchema.virtual('users', [{
    ref: 'User',
    localField: '_users',
    foreignField: 'users'
}])

const Group = mongoose.model('Group', groupSchema)

module.exports = Group