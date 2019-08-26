const Model = require('./generic')

class Restaurant extends Model {
    constructor(userData) {
        this.name = userData.name
        this.category = userData.category
        this.openTime = userData.openTime
    }
}

module.exports = {
    Restaurant
}