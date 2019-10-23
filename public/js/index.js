const lunchmemoAPI = new APIHandler()
var appWidget = $('app-widget')
var currentPage = "registration"
var appInterval = ""

var lmRunRegistration = function() {
    clearInterval(appInterval)
    currentPage = "registration"
    $('.container.app-host-lunch, .container.groups-wrapper, header').addClass('hide')
    $('.container.register-login').removeClass('hide').removeClass('fadeOut').addClass('animated fadeIn faster')
}

$(document).ready(() => {

    document.getElementById("fp-registration").onsubmit = async function(e) {
        e.preventDefault()

        let userData = {
            name: $("#register-name").val(),
            email: $("#register-email").val(),
            password: $("#register-password").val()
        }

        lunchmemoAPI.createUser(userData)
    }

    document.getElementById("fp-login").onsubmit = async function(e) {
        e.preventDefault()

        let userData = {
            email: $("#login-email").val(),
            password: $("#login-password").val()
        }

        lunchmemoAPI.userLogin(userData)
            .then(res => {
                $('.container.register-login').addClass('animated fadeOut faster hide')  
            })
            .catch(err => {
                console.log(err)
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