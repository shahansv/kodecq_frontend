import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="h-18 relative">
      <div className="flex justify-between items-center bg-black text-white px-8 py-4 fixed top-0 w-full">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Kodecq<span className="text-orange-400">.dev</span>
          </h1>
        </Link>
        <Button className="bg-orange-400/60 border border-orange-400 font-bold hover:bg-orange-400 hover:scale-105 cursor-pointer">
          Get started
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
