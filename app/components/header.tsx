import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  name: string;
  pages: {
    id: number;
    label: string;
    link: string;
  }[];
};

// Header component displaying a navigation menu and an image
export const Header = ({ name, pages }: HeaderProps) => {
  return (
    // Header container
    <header className="flex flex-col relative bg-linear-557AFF w-full h-48">
      {/* Container for navigation menu */}
      <div className="flex flex-col justify-around h-full sm:px-6 px:1 bg-header z-10">
        {/* Navigation menu */}
        <nav className="text-right flex flex-row sm:gap-6 self-end gap-1">
          {/* Map over the pages array and render each link */}
          {pages.map((page) => {
            return (
              // Link component pointing to the page's link
              <Link
                aria-label={page.label}
                className="px-6 py-2 min-w-100 hover:bg-blue-light hover:text-blue font-display uppercase tracking-wide sm:bg-none bg-white"
                href={page.link}
                key={page.id}
              >
                {/* Render the label of the page */}
                {page.label}
              </Link>
            );
          })}
        </nav>
        {/* Heading displaying the name */}
        <h1 className="text-white uppercase pl-2 sm:pl-0"> {name} </h1>
      </div>
      {/* Image */}
      <Image
        alt={`Image of ${name}`}
        aria-label={`Image of ${name}`}
        className="w-full h-48 object-cover object-top absolute mb-6"
        height={400}
        priority
        src="/images/jeshoots-com-pUAM5hPaCRI-unsplash.jpg"
        width={2000}
      />
    </header>
  );
};
