"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/aceternity/Sidebar";
import {
  LayoutDashboard,
  LogOut,
  MessageCircleQuestionMark,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserDataContext";
import { authContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/shadcn/Tooltip";

export function DashboardLayout() {
  const navigate = useNavigate();

  const { theme, saveTheme, userData } = useContext(userDataContext);
  const { token } = useContext(authContext);

  useEffect(() => {
    if (!token) {
      toast.error("Please login");
      navigate("/login");
    }
  }, []);

  const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: (
        <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Questions",
      to: "questions",
      icon: (
        <MessageCircleQuestionMark className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      to: "profile",
      icon: (
        <User className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      to: "/",
      onClick: () => document.getElementById("logout_model").showModal(),
      icon: (
        <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme == "dark");
  }, [theme]);

  const toggleTheme = () => {
    saveTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <div
      className={cn(
        " flex w-full flex-1 flex-col overflow-hidden bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <div className="pl-0.5 mb-2">
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
            </div>

            <SidebarLink
              link={{
                label: userData?.name,
                to: "profile",
                icon: (
                  <img
                    src={userData?.profilePhoto}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <div className="h-8 flex items-center">
      <Link
        to={"/"}
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      >
        <img
          src="https://ik.imagekit.io/shahansv/kodecq/assets/KodecqLogo.svg"
          alt=""
          className="h-6 w-6 shrink-0"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium whitespace-pre text-black dark:text-white"
        >
          <h1 className="text-2xl font-semibold">
            Kode<span className="text-cyan-400 font-bold">cq</span>
          </h1>
        </motion.span>
      </Link>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <div className="h-8 flex items-center">
      <Link
        to={"/"}
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      >
        <img
          src="https://ik.imagekit.io/shahansv/kodecq/assets/KodecqLogo.svg"
          alt=""
          className="h-6 w-6 shrink-0"
        />
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const { removeToken } = useContext(authContext);
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    toast.success("Logged out successfully");
    navigate("/");
  };
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl  bg-white dark:bg-neutral-950 overflow-y-auto">
        <Outlet />
      </div>

      <dialog id="logout_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-200 dark:bg-zinc-800 ">
          <h3 className="font-bold text-lg">Confirm logout</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-slate-600 border border-slate-900 hover:bg-slate-800 px-5 text-slate-50">
                No
              </button>
            </form>
            <button
              className="btn rounded-lg bg-red-100 border border-red-300 hover:bg-red-500 hover:border-red-500 px-5 text-red-500 hover:text-red-50"
              onClick={logout}
            >
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
