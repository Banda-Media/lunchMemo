class APIHandler {
    constructor(baseUrl) {
      this.BASE_URL = baseUrl;
    }

    async createOneRegister(userData) {
        return axios.post(`${this.BASE_URL}/users/`, userData)
        .then(res => {
            console.log(userData)
            axios.post(`${this.BASE_URL}/login/`, userData)
            return userData
        })
        .catch(err => {
            console.log(err)
            return err
        })
    }
}

