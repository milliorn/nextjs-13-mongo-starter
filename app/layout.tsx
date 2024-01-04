import React from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { aboutMeData, contactMeLinks, pages } from "./data/data";
import "./global.css";
import LayoutHead from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <LayoutHead />
      <body>
        <Header name={aboutMeData.name} pages={pages} />
        <main className="sm:mb-32 mb-16">{children}</main>
        <Footer contactMeLinks={contactMeLinks} />
      </body>
    </html>
  );
}
