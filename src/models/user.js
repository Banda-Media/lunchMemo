const Model = require('./generic')

class User extends Model {
    constructor(userData) {
        this.name = userData.name
        this.email = userData.email
        this.password = userData.password
        this.groupSize = userData.groupSize
        this.active = userData.active
        this.startRange = userData.startRange
        this.endRange = userData.endRange
    }
}

const findAll = function() {
    console.log('findAll')
}

const range = function() {
    console.log('range')
}

const setActive = function(user) {
    user.active = true
    save(user)
}
const save = function(user) {
    //TODO: Database saving.
}

module.exports = {
    findAll,
    range,
    setActive,
    save,
    User
}