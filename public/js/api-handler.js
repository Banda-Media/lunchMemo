class APIHandler {
    constructor() {}

    getActiveGroups() {
        console.log('API Handler attempting to get active groups')
        return axios.get(`/api/active/groups`, { headers: { Authorization: window.sessionStorage.authStr } })
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    getUserById(_id) {
        console.log('API Handler attempting to get user by ID: ', _id)
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
        console.log('API Handler attempting to get group by ID: ', _id)
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
        console.log(`API Handler attempting to create user: ${JSON.stringify(userData)}`)
        return axios.post(`/signup`, userData)
            .then(res => {
                console.log(`API Handler has successfully created user using data: ${JSON.stringify(userData)}`)
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
                console.log(e)
                $(".notice").text("User not found. Please try again.")
                return e
            })
    }

    deleteGroup(groupIndex) {
        return axios.delete(`/api/groups/${groupIndex}`, { headers: { Authorization: window.sessionStorage.authStr } })
            .then(res => {
                console.log(`Delete group ${groupIndex}`)
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    createGroup(groupData) {
        console.log('creating group with data', groupData)
        return axios.post(`/api/groups/`, { headers: { Authorization: window.sessionStorage.authStr } }, groupData)
            .then(res => {
                console.log(`Created group ${res.data.group}`)
                return res.data.group
            })
            .catch(e => {
                console.log('error received: ', e)
                return e
            })
    }

    updateGroup(groupData) {
        return axios.patch(`/api/groups/`, { headers: { Authorization: window.sessionStorage.authStr } }, groupData)
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