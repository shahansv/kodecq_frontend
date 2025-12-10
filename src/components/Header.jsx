import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 relative z-30">
      <div className="flex justify-between items-center bg-black text-white px-8 py-4 fixed top-0 w-full">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Kodecq<span className="text-cyan-300">.dev</span>
          </h1>
        </Link>

        <Link to={"/register"}>
          <Button className="bg-cyan-300/20 border border-cyan-300 font-bold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer">
            Get started
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
