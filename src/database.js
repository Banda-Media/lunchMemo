const mongoose = require('mongoose')

var uri = "mongodb://localhost/lunchmemo"
if (process.env.LUNCHMEMO_MONGODB_USER) uri = `mongodb+srv://${process.env.LUNCHMEMO_MONGODB_USER}:${process.env.LUNCHMEMO_MONGODB_PASS}@${process.env.LUNCHMEMO_MONGODB_URI}`

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
var connection = mongoose.connection;

connection.on('connected', () => console.log('Connected to MongoDB database'));
connection.on('disconnected', () => console.log('Disconnected from MongoDB database'));

connection.on('SIGINT', () => {
    connection.close(() => {
        console.log('Lost connection to MongoDB database due to process termination');
        process.exit();
    });
});

module.exports = connection;