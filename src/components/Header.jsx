import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="h-16 relative z-30">
      <div className="flex justify-between items-center bg-black text-white px-8 py-4 fixed top-0 w-full">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Kodecq<span className="text-cyan-400">.dev</span>
          </h1>
        </Link>
        {isLoggedIn ? (
          <>
            <Link to={"/dashboard"}>
              <Button className="bg-cyan-300/20 border border-cyan-400 font-bold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer">
                Go to dashboard
                <ArrowRightIcon />
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/register"}>
              <Button className="bg-cyan-300/20 border border-cyan-400 font-bold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer">
                Get started
                <ArrowRightIcon />
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
