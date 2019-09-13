const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
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
    timestamps: true
})

// groupSchema.virtual('creator', {
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'creator'
// })

// groupSchema.virtual('users', [{
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'users'
// }])

const Group = mongoose.model('Group', groupSchema)

module.exports = Group