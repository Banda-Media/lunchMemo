const Model = require('./generic')
const axios = require('axios')
const BASE_URL = "http://localhost:3001/users"

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

    json() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            groupSize: this.groupSize,
            active: this.active,
            startrange: this.startRange,
            endrange: this.endRange
        }
    }
}

const findAll = async function() {
    const users = await axios.get(`${BASE_URL}`)
    return users.data
}

const findFromId = function(uid) {
    const user = new User(axios.get(`${BASE_URL}/${uid}`))
    return JSON.stringify(user)
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