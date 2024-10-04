const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name missing"]
    },
    last_name: {
        type: String,
        required: [true, "Last name missing"]
    },
    email: {
        type: String,
        required: [true, "Email missing"]
    },
    password: {
        type: String,
        required: [true, "Password missing"]
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;