class APIHandler {
    constructor(baseUrl) {
        this.API_BASE_URL = baseUrl;
    }

    getActiveGroups() {
        return axios.get(`${this.API_BASE_URL}/active/groups`)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    getUserById(_id) {
        return axios.get(`${this.API_BASE_URL}/users/${_id}`)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }


    getGroupById(_id) {
        return axios.get(`${this.API_BASE_URL}/groups/${_id}`)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    createUser(userData) {
        return axios.post(`${this.API_BASE_URL}/users/`, userData)
            .then(res => {
                this.userLogin({ password: userData.password, email: userData.email })
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    userLogin(userData) {
        console.log(`POST: ${this.API_BASE_URL}/login/`, { password: userData.password, email: userData.email })
        return axios.post(`${this.API_BASE_URL}/login/`, { password: userData.password, email: userData.email })
            .then(res => {
                window.me = res.data.user
                lmRunApp()
                return res
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }

    deleteGroup(groupIndex) {
        return axios.delete(`${this.API_BASE_URL}/groups/${groupIndex}`)
            .then(res => {
                console.log(`Delete group ${groupIndex}`)
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    createGroup(groupData) {
        return axios.post(`${this.API_BASE_URL}/groups/`, groupData)
            .then(res => {
                console.log(`Created group ${res.data.group}`)
                return res.data.group
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    updateGroup(groupData) {
        return axios.patch(`${this.API_BASE_URL}/groups/`, groupData)
            .then(res => {
                console.log(`Updated group ${res.data.group}`)
                return res.data.group
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }
}