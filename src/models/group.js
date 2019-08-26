const Model = require('./generic')

const Group = function Group(groupData) {
    this.users = groupData.users
    this.categories = groupData.categories
    this.active = true

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
    Group
}