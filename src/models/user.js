const Model = require('./generic')

class User extends Model {
    constructor (userData) {
        this.name = userData.name
        this.email = userData.email
        this.password = userData.password
        this.groupSize = userData.groupSize
        this.active = userData.active
        this.startRange = userData.startRange
        this.endRange = userData.endRange
    }
}

module.exports = User