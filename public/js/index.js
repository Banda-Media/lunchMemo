const lunchmemoAPI = new APIHandler(`http://localhost:3000`)

$(document).ready(() => {

    document.getElementById("fp-registration").onsubmit = async function(e) {
        e.preventDefault()

        let userData = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }

        lunchmemoAPI.createOneRegister(userData)
            .then( res => {
                $(".register").addClass("animated fadeOut faster")
            })
    }

})