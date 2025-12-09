import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 relative">
      <div className="flex justify-between items-center bg-black text-white px-8 py-4 fixed top-0 w-full">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Kodecq<span className="text-lime-400">.dev</span>
          </h1>
        </Link>
        <Button className="bg-lime-400/70 border border-lime-400 font-bold hover:bg-lime-400 hover:text-lime-900 hover:scale-105 cursor-pointer">
          Get started
          <ArrowRightIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
