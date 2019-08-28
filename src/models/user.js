const axios = require('axios')
const BASE_URL = "https://lunch-memo.herokuapp.com/users"

const findAll = async function() {
    const users = await axios.get(`${BASE_URL}`)
    console.log('got all users: ', users.data)
    return users.data
}

const findFromId = async function(uid) {
    const user = await axios.get(`${BASE_URL}/${uid}`)
    return user.data
}

const findFromEmail = async function(email) {
    const users = await findAll()
    for (i = 0; i < users.length - 1; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            return users[i]
        }
    }
    throw "Email not found."
}

const update = async function(userData) {
    console.log('user model update to: ', `${BASE_URL}/${userData.id}`)
    return await axios.patch(`${BASE_URL}/${userData.id}`, userData)
}

const remove = async function(uid) {
    return await axios.delete(`${BASE_URL}/${uid}`)
}

const save = async function(userData) {
    return await axios.post(`${BASE_URL}`, userData)
}

const setActive = async function(uid) {
    return await axios.patch(`${BASE_URL}/${uid}`, { active: true })
}

const setInactive = async function(uid) {
    return await axios.patch(`${BASE_URL}/${uid}`, { active: false })
}


module.exports = {
    findAll,
    findFromId,
    findFromEmail,
    remove,
    update,
    save,
    setActive,
    setInactive
}