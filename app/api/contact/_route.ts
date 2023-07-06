const fs = require("fs"); // Importing the Node.js file system module
const path = require("path"); // Importing the Node.js path module
import { NextRequest, NextResponse } from "next/server"; // Importing Next.js server components

// Handling a POST request to this endpoint
export async function POST(request: NextRequest) {

	const data = await request.json(); // Parsing the JSON data from the request body

	// Constructing the file path for the submission JSON file
	const filePath = path.resolve(process.cwd(), "app/data/submission.json");

	let submissions: any = [];

	try {
		const fileData = fs.readFileSync(filePath, "utf8"); // Reading the file synchronously
		submissions = JSON.parse(fileData); // Parsing the file data as JSON
	} catch (error) {
		console.error("Error reading this file", error);
	}

	submissions.push(data); // Adding the new submission data to the array of submissions

	try {
		const newData = JSON.stringify(submissions, null, 2); // Converting the updated submissions array back to JSON
		fs.writeFileSync(filePath, newData, "utf8"); // Writing the updated data to the file
	} catch (error) {
		console.error("Error writing this file", error);
	}

	// Returning a JSON response with the submitted data and a success message
	return NextResponse.json({
		data: data,
		message: "This message has been successfully sent",
	});
}
