// Import the mongoose library
const mongoose = require("mongoose");

// Define the schema for a message
const MessageSchema = new mongoose.Schema({
	name: String,
	email: String,
	company: String,
	message: String,
	date: Date,
});

// Export the Message model or use an existing one if it already exists
module.exports = mongoose.models.Message ?? mongoose.model("Message", MessageSchema);
