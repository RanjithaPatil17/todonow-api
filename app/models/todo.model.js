const mongoose = require("mongoose");

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        userId: String,
        text_description: String,
        completed: Boolean,
    })
);

module.exports = Todo;