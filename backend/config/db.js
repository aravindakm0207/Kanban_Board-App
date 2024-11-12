const mongoose = require("mongoose");
const configureDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        //const db = await mongoose.connect('mongodb://127.0.0.1:27017/kanban-Nov24');
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    }
};

module.exports = configureDB;
