const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String, 
    profilePic: String, 
}, { timestamps: true });

const User = model('User', userSchema);
module.exports = User;
