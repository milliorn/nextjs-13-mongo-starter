"use client";
import React, { useEffect, useRef, useState } from "react";

export const Form = () => {
  // State variable to track if the message has been sent
  const [isMessageSent, setMessageSent] = useState<boolean>(false);

  // Reference to the form element
  const formRef = useRef<HTMLFormElement | null>(null);

  // Function to handle form submission
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const target = e.currentTarget;

    // Accessing form input values
    const company = target.elements.namedItem("company") as HTMLInputElement;
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const message = target.elements.namedItem("message") as HTMLInputElement;
    const name = target.elements.namedItem("name") as HTMLInputElement;

    const data = {
      company: company.value,
      email: email.value,
      message: message.value,
      name: name.value,
    };

    try {
      // Sending a POST request to the server with form data
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }

      setMessageSent(true); // Setting the message sent state to true
    } catch (error: any) {
      console.log(
        "There was a problem with the fetch operation " + error.message
      );
    }
  }

  // Effect to handle resetting the form and clearing the message sent state
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isMessageSent && formRef) {
      formRef.current?.reset(); // Resetting the form

      setTimeout(() => {
        setMessageSent(false); // Clearing the message sent state after 2 seconds
      }, 2000);
    }

    return () => {
      clearTimeout(timeout); // Clearing the timeout when the component unmounts
    };
  }, [isMessageSent]);

  return (
    <>
      {/* Form fields */}
      <form onSubmit={handleSubmit} className="bg-white p-10" ref={formRef}>
        <button
          type="submit"
          className="bg-blue rounded-md text-white hover:text-blue hover:bg-white min-w-100 px-5 h-12 border border-slate-300 hover:border-indigo-300hover:border-1"
        >
          Send Message
        </button>
      </form>
      {/* Message sent confirmation */}
      {isMessageSent && <p> Message has been Sent</p>}{" "}
    </>
  );
};
