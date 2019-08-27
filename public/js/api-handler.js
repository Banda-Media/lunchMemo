class APIHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl;
    }

    createOneRegister(userData) {
        return axios.post(`${this.BASE_URL}/users/`, userData)
            .then(res => {
                axios.post(`${this.BASE_URL}/login/`, { user: userData })
                return userData
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }

    updateOneRegister(userData) {
        console.log(`updateOneRegister PATCH: ${this.BASE_URL}/users`)
        console.log({ user: userData })

        return axios.patch(`${this.BASE_URL}/users`, { user: userData })
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