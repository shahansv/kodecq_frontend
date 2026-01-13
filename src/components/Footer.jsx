import React from "react";
import { TextHoverEffect } from "./ui/aceternity/TextHoverEffect";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-20 flex flex-col justify-between   ">
      <TextHoverEffect text="Kodecq" />
      <div className="text-neutral-700 dark:text-neutral-500 text-sm font-bold text-center mb-2">
        &copy; {currentYear} Kodecq. All rights reserved. Developed by
        <a
          target="_blank"
          href="https://github.com/shahansv"
          className="text-cyan-400  dark:text-cyan-400/90 mx-1 font-semibold hover:text-cyan-300 "
        >
          shahan.sv
        </a>
      </div>
    </footer>
  );
};

export default Footer;
