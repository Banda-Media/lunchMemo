const mongoose = require('mongoose')

const uri = `mongodb+srv://lunchmemoAdmin:${process.env.LUNCHMEMO_MONGODB_PASS}@lunchmemo-qhc6i.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true })
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