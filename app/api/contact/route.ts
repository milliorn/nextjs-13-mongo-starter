import mongoose from "mongoose"; // Importing the Mongoose library for MongoDB interaction
import { NextRequest, NextResponse } from "next/server"; // Importing Next.js server components
import Message from "../../../models/Message"; // Importing the Message model

// Handling a POST request to this endpoint
export async function POST(req: NextRequest, res: NextResponse) {

	// Constructing the MongoDB connection URI using environment variables
	const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
	const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
	const MONGO_USERNAME = process.env.MONGO_USERNAME;
	// Use MONGODB_URI in your code to connect to MongoDB
	const MONGODB_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGODB_CLUSTER}`;

	let client;

	try {
		client = await mongoose.connect(MONGODB_URI); // Connecting to the MongoDB database
		console.log("MongoDB connected");
	} catch (error) {
		console.log("There was an error connecting to MongoDB", error);
	}

	const data = await req.json(); // Parsing the JSON data from the request body

	const { name, email, company, message } = data; // Extracting relevant data from the request body

	// Checking if any required fields are missing or if email is invalid
	if (!name || !company || !message || !email || !email.includes("@") || message.trim() === "" || name.trim() === "") {
		NextResponse.json(
			{ message: "Invalid input - fill all the fields" },
			{
				status: 422, // Returning a response with a status code of 422 (Unprocessable Entity)
			}
		);
		return;
	}

	const newData = {
		...data,
		date: new Date(), // Adding the current date to the data object
	};

	try {
		await Message.create(newData); // Creating a new Message document in the database
		console.log("Message Sent");
		return NextResponse.json(
			{ message: "Message sent" },
			{
				status: 201, // Returning a response with a status code of 201 (Created)
			}
		);
	} catch (error) {
		console.log("Message couldn't be sent", error);
		return NextResponse.json(
			{ message: "Error sending the message" },
			{
				status: 500, // Returning a response with a status code of 500 (Internal Server Error)
			}
		);
	}
}
