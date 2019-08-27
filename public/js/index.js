const lunchmemoAPI = new APIHandler(`http://localhost:3000`)

$(document).ready(() => {

    document.getElementById("fp-registration").onsubmit = async function(e) {
        e.preventDefault()

        let userData = {
            name: $("#register-name").val(),
            email: $("#register-email").val(),
            password: $("#register-password").val()
        }

        lunchmemoAPI.createOneRegister(userData)
            .then(res => {
                $(".register").addClass("animated fadeOut faster")
            })
    }

    document.getElementById("fp-login").onsubmit = async function(e) {
        e.preventDefault()

        let userData = {
            email: $("#login-email").val(),
            password: $("#login-password").val()
        }

        lunchmemoAPI.userLogin(userData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                $(".error").text("User not found. Please try again.")
                return err
            })
    }

    $(".go-register").click(function() {
        $(".widget-login").addClass("hide")
        $(".widget-register").removeClass("hide")
        $(".widget-register").addClass("animated fadeIn faster")
    });

    $(".go-login").click(function() {
        $(".widget-register").addClass("hide")
        $(".widget-login").removeClass("hide")
        $(".widget-login").addClass("animated fadeIn faster")
    });

})