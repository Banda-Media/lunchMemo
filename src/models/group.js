const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    members: {
        type: [{ type: ObjectId, ref: 'User' }],
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Group = mongoose.model('Task', groupSchema)

module.exports = Group