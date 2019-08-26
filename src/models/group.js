const Model = require('./generic')

class Group extends Model {
    constructor (userData) {
        this.users = userData.users
        this.categories = userData.categories
        this.active = true
    }

    range(){
        return null
    }
}

module.exports = Group