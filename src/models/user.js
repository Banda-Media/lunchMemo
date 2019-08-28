const axios = require('axios')
const DB_USER_BASE_URL = "http://localhost:3001/users"

const findAll = async function() {
    console.log('findAll()')
    const users = await axios.get(`${DB_USER_BASE_URL}`)
    console.log("found all")
    return users.data
}

const findFromId = async function(uid) {
    const user = await axios.get(`${DB_USER_BASE_URL}/${uid}`)
    return user.data
}

const findFromEmail = async function(email) {
    console.log('find from email!!!')
    const users = await findAll()
    console.log('all users', users)
    for (i = 0; i < users.length - 1; i++) {
        console.log(`${users[i].email.toLowerCase()} === ${email.toLowerCase()}`, users[i].email.toLowerCase() === email.toLowerCase())
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            console.log('found email')
            return users[i]
        }
    }
    new Error("Email not found.")
}

const update = async function(userData) {
    console.log(userData.id)
    return await axios.patch(`${DB_USER_BASE_URL}/${userData.id}`, userData)
}

const remove = async function(uid) {
    return await axios.delete(`${DB_USER_BASE_URL}/${uid}`)
}

const save = async function(userData) {
    return await axios.post(`${DB_USER_BASE_URL}`, userData)
}

const setActive = async function(uid) {
    return await axios.patch(`${DB_USER_BASE_URL}/${uid}`, { active: true })
}

const setInactive = async function(uid) {
    return await axios.patch(`${DB_USER_BASE_URL}/${uid}`, { active: false })
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