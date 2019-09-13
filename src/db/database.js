const mongoose = require('mongoose')

const uri = `mongodb+srv://lunchmemoAdmin:${process.env.LUNCHMEMO_MONGODB_PASS}@${process.env.MONGODB_SERVER_URI}`
mongoose.connect(uri, { useNewUrlParser: true })
var connection = mongoose.connection;

connection.on('connected', () => console.log('Connected to db'));
connection.on('disconnected', () => console.log('Disconnected from db'));

connection.on('SIGINT', () => {
    connection.close(() => {
        console.log('Lost connection to db due to process termination');
        process.exit();
    });
});

module.exports = connection;