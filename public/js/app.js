const groupsWidget = $('.groups-wrapper')
const lunchGroupRows = {}

function createGroupsFromList(groups) {
    groups.map(group => {
        if (lunchGroupRows[group.name] === undefined && group.active == "true") {
            lunchGroupRows[group.name] = new LunchGroupRow(group)
        }
    })
}
class LunchGroupRow {
    constructor(group) {
        this.groupObj = group

        this.div = document.createElement('DIV')
        this.attendeesDiv = document.createElement('DIV')
        this.groupTimeDiv = document.createElement('DIV')
        this.startTimeDiv = document.createElement('DIV')
        this.endTimeDiv = document.createElement('DIV')
        this.joinLeaveDiv = document.createElement('DIV')
        this.hostnameDiv = document.createElement('DIV')
        this.joinLeaveBtn = document.createElement('BUTTON')
        this.attendeeUL = document.createElement('ul')

        let fieldNames = ['host', 'empty', 'occupied']
        fieldNames.map(className => {
            let li = document.createElement('LI')
            let i = document.createElement('I')
            li.appendChild(i)
            li.className = className
            i.className = 'fas fa-user-alt'
            this.attendeeUL.appendChild(li)
        })

        this.attendeesDiv.appendChild(this.hostnameDiv)
        this.attendeesDiv.appendChild(this.attendeeUL)
        this.joinLeaveDiv.appendChild(this.joinLeaveBtn)
        this.groupTimeDiv.appendChild(this.startTimeDiv)
        this.groupTimeDiv.appendChild(this.endTimeDiv)

        this.div.className = "group-container"
        this.attendeesDiv.className = "attendees"
        this.hostnameDiv.className = "hostname"
        this.attendeeUL.className = "attendee-list"
        this.groupTimeDiv.className = "group-time-range"
        this.startTimeDiv.className = "start-time"
        this.endTimeDiv.className = "end-time"
        this.joinLeaveDiv.className = "join-leave"
        this.joinLeaveBtn.className = "btn btn-join-leave"
        this.joinLeaveBtn.innerHTML = "Join"

        this.children = [this.attendeesDiv, this.groupTimeDiv, this.joinLeaveDiv]

        this.children.map(child => this.div.appendChild(child))
        groupsWidget.append(this.div)
        this.update()
    }

    get isActive() {
        return this.groupObj.active == "true"
    }

    addMember(user) {
        this.groupObj.users.append(user.id)
    }

    remove() {
        console.log('Removing ')
        this.div.remove()
    }

    update() {

    }
}

var lmRunApp = function() {
    let now = new Date($.now());
    $('#app-widget').removeClass('hide')
    $('header').removeClass('hide')
    $('#app-widget').addClass('animated fadeIn faster')
    $('header').addClass('animated fadeInTop')

    $('.container.register-login').addClass('animated fadeOut faster')

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

    setInterval(async function() {
            console.log('Checking for active/inactive groups...')
            lunchmemoAPI.getActiveGroups()
                .then(res => createGroupsFromList(res.groups))
                .catch(e => {
                    console.log(e)
                    return e
                })

            Object.values(lunchGroupRows).map(rowGroup => {
                console.log(rowGroup.isActive, rowGroup)
                if (!rowGroup.isActive) {
                    console.log(`Removing group ${rowGroup.groupObj.name}`)
                    rowGroup.remove()
                }
            })
        },
        5000)
}