class APIHandler {
    constructor(baseUrl) {
      this.API_BASE_URL = baseUrl;
    }

    async createOneRegister(userData) {
        return axios.post(`${this.API_BASE_URL}/users/`, userData)
        .then(res => {
            console.log(userData)
            axios.post(`${this.API_BASE_URL}/login/`, {password: userData.password, email: userData.email})
            window.me = res.data.user.id
            lmRunApp()
            return res
        })
    }

    async userLogin(userData) {
        return axios.post(`${this.API_BASE_URL}/login/`, {password: userData.password, email: userData.email})
        .then(res => {
            window.me = res.data.user.id
            lmRunApp()
            return res
        })
        .catch(err => {
            return err
        })
    }  
}

