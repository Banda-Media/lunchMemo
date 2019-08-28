const axios = require('axios')
const DB_GROUPS_BASE_URL = "http://localhost:3001/groups"

const findAll = async function() {
    const groups = await axios.get(`${DB_GROUPS_BASE_URL}`)
    return groups.data
}

const findFromId = async function(uid) {
    const group = await axios.get(`${DB_GROUPS_BASE_URL}/${uid}`)
    return group.data
}

const update = async function(group) {
    return await axios.patch(`${DB_GROUPS_BASE_URL}/${group.id}`, group)
}

const remove = async function(uid) {
    return await axios.delete(`${DB_GROUPS_BASE_URL}/${uid}`)
}

const save = async function(groupData) {
    return await axios.post(`${DB_GROUPS_BASE_URL}`, groupData)
}

const setActive = async function(uid) {
    return await axios.patch(`${DB_GROUPS_BASE_URL}/${uid}`, { active: true })
}

const setInactive = async function(uid) {
    return await axios.patch(`${DB_GROUPS_BASE_URL}/${uid}`, { active: false })
}

module.exports = {
    findAll,
    findFromId,
    remove,
    save,
    update,
    setActive,
    setInactive
}