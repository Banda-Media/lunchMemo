const Group = {
    description: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        default: []
    }
}

module.exports = Group