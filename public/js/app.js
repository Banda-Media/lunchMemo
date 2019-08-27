var lmRunApp = function() {
    let now = new Date($.now());
    $('#app-widget').addClass('animated fadeInTop')
    $('#app-widget').removeClass('hide')
    $('header').removeClass('hide')

    $('.container').addClass('animated fadeOut faster')

    $('.timepickerStart').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '8:00am',
        maxTime: '6:00pm',
        defaultTime: String(now.getHours()),
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    $('.timepickerEnd').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '8:00am',
        maxTime: '6:00pm',
        defaultTime: String(now.getHours() + 1),
        startTime: '10:30',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    $("#profile-btn").click(() => {
        window.me = { id: 1 }
        let userUpdateData = {
            id: window.me.id,
            startRange: $('#timepicker-start').val(),
            endRange: $('#timepicker-end').val(),
            groupSize: $('#group-size-select').val(),
            active: true
        }
        lunchmemoAPI.updateOneRegister(userUpdateData)
            .then(res => {
                console.log('Successfully updated user.', res)
            })
            .catch(e => {
                console.log(e)
                return e
            })
    })
}