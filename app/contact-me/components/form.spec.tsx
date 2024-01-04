import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "isomorphic-fetch";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { Form } from "./form";
import React from "react";

// Configure mock API endpoints
const handlers = [
  http.post("/api/contact", async ({ params }) => {
    const { email } = params;

    // Handle different email values
    if (email === "bad_request@response.co.uk") {
      return HttpResponse.json({
        message: "Bad Request",
      });
    } else if (email === "internal_error@response.co.uk") {
      return HttpResponse.json({
        message: "Internal Server Error",
      });
    }

    // Default response for successful request
    return HttpResponse.json({ message: "Success!" });
  }),
];

// Create mock server using MSW
const server = setupServer(...handlers);

// Test suite for the Contact Form component
describe("Contact Form component", () => {
  // Spy on console.log to track logs
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();

  // Set up server before running the tests
  beforeAll(() => server.listen());

  // Clean up after each test
  afterEach(() => {
    server.restoreHandlers();
    consoleSpy.mockClear();
  });

  // Close server after running the tests
  afterAll(() => server.close());

  // Test case for successful form submission
  it("should submit the form and show a successful message", async () => {
    // Render the form
    render(<Form />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: {
        value: "Scott",
      },
    });

    fireEvent.change(screen.getByLabelText("Company"), {
      target: {
        value: "Freelancer",
      },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: {
        value: "example@gmail.com",
      },
    });

    fireEvent.change(screen.getByLabelText("Message"), {
      target: {
        value: "Hey there world!",
      },
    });

    // Submit the form
    fireEvent.submit(
      screen.getByRole("button", {
        name: "Send Message",
      })
    );

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText("Message has been Sent")).toBeInTheDocument();
    });
  });

  // Test case for handling 400 Bad Request response
  it("should handle 400 Bad Request response", async () => {
    // Render the form
    render(<Form />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: {
        value: "Alicia",
      },
    });

    fireEvent.change(screen.getByLabelText("Company"), {
      target: {
        value: "Time to code",
      },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: {
        value: "bad_request@response.co.uk",
      },
    });

    fireEvent.change(screen.getByLabelText("Message"), {
      target: {
        value: "Hey there!",
      },
    });

    // Submit the form
    fireEvent.submit(
      screen.getByRole("button", {
        name: "Send Message",
      })
    );

    // Wait for the error message to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "There was a problem with the fetch operation HTTP error! status: 400"
      );
    });
  });

  // Test case for handling 500 Internal Server Error
  it("should handle 500 Internal Server Error", async () => {
    // Render the form
    render(<Form />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: {
        value: "Scott",
      },
    });

    fireEvent.change(screen.getByLabelText("Company"), {
      target: {
        value: "Freelancer",
      },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: {
        value: "internal_error@response.co.uk",
      },
    });

    fireEvent.change(screen.getByLabelText("Message"), {
      target: {
        value: "Hey there, Message!",
      },
    });

    // Submit the form
    fireEvent.submit(
      screen.getByRole("button", {
        name: "Send Message",
      })
    );

    // Wait for the error message to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "There was a problem with the fetch operation HTTP error! status: 500"
      );
    });
  });
});
