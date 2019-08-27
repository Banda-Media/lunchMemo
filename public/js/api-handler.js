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

    createOneRegister(userData) {
        return axios.post(`${this.API_BASE_URL}/users/`, userData)
            .then(res => {
                console.log(userData)
                axios.post(`${this.API_BASE_URL}/login/`, { password: userData.password, email: userData.email })
                window.me = res.data.user.id
                lmRunApp()
                return res
            })
    }

    userLogin(userData) {
        return axios.post(`${this.API_BASE_URL}/login/`, { password: userData.password, email: userData.email })
            .then(res => {
                window.me = res.data.user
                lmRunApp()
                return res
            })
            .catch(err => {
                return err
            })
    }
    updateOneRegister(userData) {
        return axios.patch(`${this.API_BASE_URL}/users`, { user: userData })
            .then(res => {
                console.log('Updated user: ', userData)
                return userData
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }
}