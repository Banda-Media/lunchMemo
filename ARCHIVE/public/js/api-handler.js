class APIHandler {
    constructor() {}

    getActiveGroups() {
        return axios.get(`/api/groups?active=true`, { headers: { Authorization: window.sessionStorage.authStr } })
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    getUserById(_id) {
        return axios.get(`/api/user/${_id}`, { headers: { Authorization: window.sessionStorage.authStr } })
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    getGroupById(_id) {
        return axios.get(`/api/groups/${_id}`, { headers: { Authorization: window.sessionStorage.authStr } })
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    createUser = (userData) => {
        return axios.post(`/signup`, userData)
            .then(res => {
                window.sessionStorage.me = res.data
                this.userLogin(userData)
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    userLogin = (userData) => {
        return axios.post(`/api/login`, userData)
            .then(res => {
                window.sessionStorage.me = JSON.stringify(res.data)
                window.sessionStorage.accessToken = res.data.token
                window.sessionStorage.authStr = 'Bearer '.concat(res.data.token)
                console.log(`Logged in user: `, window.sessionStorage.me)
                lmRunApp()
                return res
            })
            .catch(e => {
                $(".notice").text("User not found. Please try again.")
                setTimeout(() => $(".notice").text(""), 3000)
                return e
            })
    }

    deleteGroup(groupIndex) {
        return axios.delete(`/api/groups/${groupIndex}`, { headers: { Authorization: window.sessionStorage.authStr } })
            .then(res => {
                console.log(`Deleted group ${groupIndex}`)
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    createGroup(groupData) {
        return axios.post(`/api/groups/`, groupData)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log('error received: ', e)
                return e
            })
    }

    updateGroup(groupData) {
        const { group } = groupData
        return axios.patch(`/api/groups/${group._id}`, group)
            .then(res => {
                return res.data.group
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }
}