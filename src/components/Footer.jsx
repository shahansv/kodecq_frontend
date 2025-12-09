import React from "react";
import { TextHoverEffect } from "./ui/TextHoverEffect";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="h-50 flex flex-col justify-between bg-black  ">
        <TextHoverEffect text="Kodecq.dev" />
        <div className="text-slate-700 text-sm font-bold text-center mb-2">
          &copy; {currentYear} Kodecq.dev. All rights reserved. Developed by
          <a
            target="_blank"
            href="https://github.com/shahansv"
            className="text-lime-400/90 mx-1 font-semibold hover:text-lime-300"
          >
            shahan.sv
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
