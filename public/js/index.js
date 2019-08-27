const lunchmemoAPI = new APIHandler(`http://localhost:${proccess.env(PORT) || 3000}`)

$(document).ready(() => {

    document.getElementById('fp-registration').onsubmit = function (e) {
        e.preventDefault()

        let userData = {
            name: documentQuerySelector("#fp-registration #name").value,
            email: documentQuerySelector("#fp-registration #email").value,
            password: documentQuerySelector("#fp-registration #password").value
        }

        lunchmemoAPI.createOneRegister(userData)
    }

})