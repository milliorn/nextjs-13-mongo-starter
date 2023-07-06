import React from "react";
import { Envelope, Linkedin, Medium, Twitter } from "../icons";

type FooterProps = {
  contactMeLinks: string[];
};

// Footer component displaying social media icons
export function Footer({ contactMeLinks }: FooterProps): JSX.Element {
  // Array of social media icons with their labels
  const socialIcons = [
    { icon: <Envelope className="icons_contactme" />, label: "Email" },
    { icon: <Linkedin className="icons_contactme" />, label: "Linkedin" },
    { icon: <Medium className="icons_contactme" />, label: "Medium" },
    { icon: <Twitter className="icons_contactme" />, label: "Twitter" },
  ];

  return (
    // Footer container
    <footer className="w-full bg-white shadow-footer mt-12 py-4 fixed bottom-0 ">
      {/* Container for social media icons */}
      <div className="flex items-center justify-center gap-1">
        {/* Map over the socialIcons array and render each icon */}
        {socialIcons.map((socialIcon, index) => (
          // Anchor element linking to the respective social media
          <a
            href={contactMeLinks[index]}
            aria-label={socialIcon.label}
            key={index}
          >
            {/* Render the social media icon */}
            {socialIcon.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
