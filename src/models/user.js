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

const findFromId = async function(uid) {
    const user = await new User(axios.get(`${BASE_URL}/${uid}`))
    return JSON.stringify(users)
}

const findFromEmail = async function(string) {
    const users = await axios.get(`${BASE_URL}`)

    for (i=0 ; i<users.length ; i++) {
        if (users.data[i].email === string) {
            return new User(users.data[i])
        }
    }
    throw "Email not found."
}

const remove = async function(uid) {
    return await axios.delete(`${BASE_URL}/${uid}`)
}

const save = async function(user) {
    findFromId(user.id)
    return await axios.patch(`${BASE_URL}`, new User(users.data))
}

const setActive = async function(uid) {
    return await axios.patch(`${BASE_URL}/${uid}`, {active: true})
}

const setInactive = async function(uid) {
    return await axios.patch(`${BASE_URL}/${uid}`, {active: true})
}


module.exports = {
    findAll,
    findFromId,
    findFromEmail,
    remove,
    save,
    setActive,
    setInactive
}