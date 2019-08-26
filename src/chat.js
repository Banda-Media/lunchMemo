const path = require('path')
const http = require('http');
const shortid = require('shortid');
const faker = require('faker');
const Filter = require('bad-words')
const express = require('express');
const socketio = require('socket.io');

const { generateMessage } = require('./utils/messages')
const { getRooms, getUser, getUsersInRoom, addUser, removeUser } = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server)
const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username: username || faker.name.findName(), room })
        if (error) {
            return callback({ error: error })
        }

        socket.join(user.room)
        socket.to(user.room).emit('emit-message', generateMessage(`Welcome user <b>${user.username}</b>!`, { type: "server" }));
        socket.broadcast.to(user.room).emit('emit-message', generateMessage(`User <b>${user.username}</b> has joined!`, { type: "server" }))
        io.to(user.room).emit('update-users', { users: getUsersInRoom(user.room), user })
        callback(`Successfully joined room ${user.room}`)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (!user.error) {
            io.to(user.room).emit('emit-message', generateMessage(`User <b>${user.username}</b> has left...`, { type: "server" }));
            io.to(user.room).emit('update-users', { users: getUsersInRoom(user.room), user })
        }
    })

    socket.on('socket-message', (msg, callback) => {
        const user = getUser(socket.id)
        msg = new Filter().isProfane(msg) ? 'Message Blocked' : msg
        io.to(user.room).emit('emit-message', generateMessage(msg, { type: "message", username: user.username }));
        callback('Message Received')
    })

    socket.on('sendLocation', (position, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('emit-message', generateMessage(`https://google.com/maps?q=${position.lat},${position.lon}`, { type: "location", username: user.username }));
        callback('Location Received')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});