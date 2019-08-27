class APIHandler {
    constructor(baseUrl) {
      this.BASE_URL = baseUrl;
    }

    createOneRegister(userData) {
        Axios.get(`$(this.BASE_URL)/users`)
        .then(res => {
            console.log(userData)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

