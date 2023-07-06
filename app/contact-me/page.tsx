import React from "react";
import { contactMeText } from "../data/data";
import { Form } from "./components/form";

// Contact Me Page component
function ContactMePage(): JSX.Element {
  return (
    <div className="flex flex-col w-11/12 content-center m-auto mt-10">
      {/* Contact Me Page title */}
      <h2> CONTACT ME</h2>

      {/* Contact Me Form */}
      <div className="flex flex-row w-9/12 content-center m-auto bg-grey-light p-20 gap-20">
        {/* Contact Me Text */}
        <div className="flex flex-col w-2/4">
          {/* Contact Me Text title */}
          <h3 className="text-2xl mb-10">{contactMeText.title}</h3>
          {/* Contact Me Text body */}
          <p>{contactMeText.body}</p>
        </div>

        {/* Contact Me Form */}
        <div className="w-2/4">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default ContactMePage;
