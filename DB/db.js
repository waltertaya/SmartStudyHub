const mongoose = require('mongoose');
require('dotenv').config();


const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;


try {
    mongoose.connect(`mongodb+srv://${db_username}:${db_password}@waltertayadb.y2nbk2w.mongodb.net/SmartStudyHub?retryWrites=true&w=majority`);
    console.log('Connected to database successfully');
} catch (error) {
    console.log(error);
}

// const { Physics } = require('./fsdb');

module.exports = mongoose;
