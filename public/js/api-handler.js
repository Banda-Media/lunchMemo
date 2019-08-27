class APIHandler {
    constructor(baseUrl) {
        this.API_BASE_URL = baseUrl;
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
        console.log(userData)
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