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
        return axios.get(`/api/users/${_id}`, { headers: { Authorization: window.sessionStorage.authStr } })
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

    createUser(userData) {
        console.log('API Handler attempting to create user: ', userData)
        return axios.post(`/api/users/`, { headers: { Authorization: window.sessionStorage.authStr } }, userData)
            .then(res => {
                console.log('API Handler has successfully created user using data (attempting to login next): ', userData)
                this.userLogin({ password: userData.password, email: userData.email })
            })
            .catch(e => {
                console.log(e)
                return e
            })
    }

    userLogin(userData) {
        console.log('API Handler attempting to login using data: ', userData)
        return axios.post(`/login/`, userData)
            .then(res => {
                window.me = res.data.user
                console.log(res.data.token)
                window.sessionStorage.accessToken = res.data.token;
                window.sessionStorage.authStr = 'Bearer '.concat(res.data.token);
                console.log('Logging in.', userData.email)
                lmRunApp()
                return res
            })
            .catch(err => {
                console.log(err)
                $(".notice").text("User not found. Please try again.")
                return err
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