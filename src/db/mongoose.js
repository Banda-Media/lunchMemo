const mongoose = require('mongoose');

console.log('Attempting to connect to server...');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

var connection = mongoose.connection;

connection.on('connected', () => console.log('connected to db'));
connection.on('disconnected', () => console.log('disconnected from db'));

connection.on('SIGINT', () => {
    connection.close(() => {
        console.log('Lost connection to db due to process termination');
        process.exit();
    });
});

module.exports = connection;