import { userDataContext } from "@/context/UserDataContext";
import { authContext } from "../context/AuthContext";
import { ArrowRightIcon, Moon, Sun } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/shadcn/Tooltip";

const Header = () => {
  const { token } = useContext(authContext);
  const { theme, saveTheme } = useContext(userDataContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    if (!theme) {
      saveTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme == "dark");
  }, [theme]);

  const toggleTheme = () => {
    saveTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <header className="h-16 relative z-30">
      <div className="flex justify-between items-center bg-neutral-900 dark:bg-black text-white px-8 py-4 fixed top-0 w-full">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Kode<span className="text-cyan-400">cq</span>
          </h1>
        </Link>
        <div className="flex gap-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="cursor-pointer transition active:rotate-45"
                onClick={toggleTheme}
              >
                {theme == "dark" ? <Sun /> : <Moon />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change theme</p>
            </TooltipContent>
          </Tooltip>

          {isLoggedIn ? (
            <>
              <Link to={"/dashboard"}>
                <button className="bg-cyan-300/20 border border-cyan-400 font-semibold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer flex items-center px-3 py-2 rounded-lg transition ">
                  Go to dashboard
                  <ArrowRightIcon className="h-5" />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/register"}>
                <button
                  className="bg-cyan-300/20 border 
              text-cyan-50 border-cyan-400 font-semibold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer flex items-center px-3 py-2 rounded-lg transition"
                >
                  Get started
                  <ArrowRightIcon className="h-5" />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
