const Model = require('./generic')
const axios = require('axios')
const BASE_URL = "http://localhost:8000/users"

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


//User.find()
const findAll = async function() {
    let x = await axios.get(`${BASE_URL}`)
    console.log(x)
}
findAll()

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