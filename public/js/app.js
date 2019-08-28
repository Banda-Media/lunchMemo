const groupsWidget = $('.groups-wrapper')
const lunchGroupRows = {}
const sizeLookup = {
    'sm': "1-2",
    'md': "3-5",
    'lg': "6-8"
}

function createGroupsFromList(groups) {
    groups.map(group => {
        if (lunchGroupRows[group.name] === undefined && String(group.active) == "true") {
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
        this.hostnameH3 = document.createElement('H3')
        this.joinLeaveBtn = document.createElement('BUTTON')
        this.attendeeUL = document.createElement('ul')

        this.fieldNames = ['host', 'empty', 'occupied']

        this.attendeesDiv.appendChild(this.hostnameH3)
        this.attendeesDiv.appendChild(this.attendeeUL)
        this.joinLeaveDiv.appendChild(this.joinLeaveBtn)
        this.groupTimeDiv.appendChild(this.startTimeDiv)
        this.groupTimeDiv.appendChild(this.endTimeDiv)

        this.div.className = "group-container"
        this.attendeesDiv.className = "attendees"
        this.hostnameH3.className = "hostname"
        this.attendeeUL.className = "attendee-list"
        this.groupTimeDiv.className = "group-time-range"
        this.startTimeDiv.className = "start-time"
        this.endTimeDiv.className = "end-time"
        this.joinLeaveDiv.className = "join-leave"
        this.joinLeaveBtn.className = "btn btn-join"
        this.joinLeaveBtn.innerHTML = "Join"

        this.joinLeaveBtn.onclick = this.btnJoinLeavePressed.bind(this)

        this.children = [this.attendeesDiv, this.groupTimeDiv, this.joinLeaveDiv]

        this.children.map(child => this.div.appendChild(child))
        groupsWidget.append(this.div)
        this.update()

    }

    get sizeRange() {
        return sizeLookup[this.groupObj.groupSize]
    }

    get isActive() {
        return String(this.groupObj.active) == "true"
    }

    btnJoinLeavePressed() {
        if (this.groupObj.users.includes(window.me.id)) {
            this.groupObj.users.splice(this.groupObj.users.indexOf(window.me.id), 1)
            this.joinLeaveBtn.className = "btn btn-join"
            this.joinLeaveBtn.innerHTML = 'Join'
        } else if (this.groupObj.maxSize == this.groupObj.users.length) {
            new Error('Maximum group size reached...sorry!')
        } else {
            this.groupObj.users.push(window.me.id)
            this.joinLeaveBtn.className = "btn btn-leave"
            this.joinLeaveBtn.innerHTML = 'Leave'
        }
        if (!this.groupObj.users.length) {
            lunchmemoAPI.deleteGroup(this.groupObj.id)
            delete lunchGroupRows[this.groupObj.name]
            this.remove()
        }
        lunchmemoAPI.updateGroup({ group: this.groupObj })
    }

    remove() {
        this.div.remove()
    }

    createUserView(className) {
        let li = document.createElement('LI')
        let i = document.createElement('I')
        li.appendChild(i)
        li.className = className
        i.className = 'fas fa-user-alt'
        this.attendeeUL.appendChild(li)
    }

    async updateAttendeesView() {
        let maxSize = parseInt(this.sizeRange.split('-')[1])

        Array(this.attendeeUL.childNodes.length).fill().map((_, i) => i >= maxSize && this.attendeeUL.childNodes[i].remove())

        Array(maxSize).fill().map((_, i) => {
            let currentUser = this.groupObj.users[i]
            let currentLine = this.attendeeUL.childNodes[i]
            if (currentLine === undefined) this.createUserView((i === 0) ? 'host' : 'empty')
            this.attendeeUL.childNodes[i].className = (currentUser) ? 'occupied' : 'empty'
        })
    }

    async update() {
        this.groupObj = (await lunchmemoAPI.getGroupById(this.groupObj.id)).group
        this.hostnameH3.innerHTML = this.groupObj.name
        this.startTimeDiv.innerHTML = `<span>Start:</span>${this.groupObj.startTime}`
        this.endTimeDiv.innerHTML = `<span>End:</span>${this.groupObj.endTime}`
        if (this.groupObj.users.includes(window.me.id)) {
            this.joinLeaveBtn.className = "btn btn-leave"
            this.joinLeaveBtn.innerHTML = 'Leave'
        }
        this.updateAttendeesView()
    }
}

var lmRunApp = function() {
    currentPage = "app"
    let now = new Date($.now());
    $('#app-widget, header, .container.groups-wrapper').removeClass('hide')
    $('#app-widget').addClass('animated fadeIn faster')
    $('header').addClass('animated fadeInTop')

    $('#username-nav').html(window.me.name)

    $('.container.register-login').addClass('hide animated fadeOut faster')

    $('.timepickerStart').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '10:00am',
        maxTime: '5:00pm',
        defaultTime: String(now.getHours()),
        startTime: '10:00',
        dynamic: true,
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
        let groupData = {
            users: [window.me.id],
            name: $('#group-name').val(),
            startTime: $('#timepicker-start').val(),
            endTime: $('#timepicker-end').val(),
            groupSize: $('#group-size-select').val(),
            active: true
        }
        lunchmemoAPI.createGroup(groupData)
            .then(res => {})
            .catch(e => {
                console.log(e)
                return e
            })
    })

    var appInterval = setInterval(async function() {
            lunchmemoAPI.getActiveGroups()
                .then(res => {
                    createGroupsFromList(res.groups)
                })
                .catch(e => {
                    console.log(e)
                    return e
                })
            currentPage == "app" && $(".site-background").height($(".app-wrap").height() + 130)

            Object.values(lunchGroupRows).map(rowGroup => {
                if (!rowGroup.isActive) {
                    rowGroup.remove()
                } else {
                    rowGroup.update()
                }
            })

            currentPage == "app" && $(".site-background").height($(".app-wrap").height() + 130)
        },
        1000)
}