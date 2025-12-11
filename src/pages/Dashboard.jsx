import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  IconBrandTabler,
  IconMenu2,
  IconX,
  IconMessageQuestion,
  IconUserCode,
  IconLogout2,
} from "@tabler/icons-react";
import logo from "../assets/favicon.svg";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const animate = true;

  return (
    <>
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row border-neutral-700 bg-neutral-800",
          "h-screen"
        )}
      >
        <motion.div
          className={cn(
            "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-800 w-[300px] shrink-0"
          )}
          animate={{
            width: animate ? (open ? "300px" : "65px") : "300px",
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Link
            to="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
            aria-hidden
          >
            <img src={logo} alt="Kodecq.dev logo" className="h-10 w-8 " />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0 }}
              style={{ display: open ? "inline-block" : "none" }}
              className="whitespace-pre text-white text-2xl font-bold"
            >
              Kodecq<span className="text-cyan-400">.dev</span>
            </motion.span>
          </Link>

          <div className="mt-8 flex flex-col gap-2 ml-1">
            <Link
              to="/dashboard"
              className="flex items-center justify-start gap-2 group/sidebar py-2"
            >
              <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />
              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? "inline-block"
                      : "none"
                    : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                transition={{ duration: 0.12 }}
                className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0"
              >
                Dashboard
              </motion.span>
            </Link>

            <Link
              to="questions"
              className="flex items-center justify-start gap-2 group/sidebar py-2"
            >
              <IconMessageQuestion className="h-5 w-5 shrink-0 text-neutral-200" />
              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? "inline-block"
                      : "none"
                    : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                transition={{ duration: 0.12 }}
                className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0"
              >
                Questions
              </motion.span>
            </Link>

            <Link
              to="profile"
              className="flex items-center justify-start gap-2 group/sidebar py-2"
            >
              <IconUserCode className="h-5 w-5 shrink-0 text-neutral-200" />
              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? "inline-block"
                      : "none"
                    : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                transition={{ duration: 0.12 }}
                className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0"
              >
                Profile
              </motion.span>
            </Link>

            <button
              className="flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <IconLogout2 className="h-5 w-5 shrink-0 text-neutral-200" />
              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? "inline-block"
                      : "none"
                    : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                transition={{ duration: 0.12 }}
                className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0"
              >
                Logout
              </motion.span>
            </button>
          </div>

          <div className="mt-auto">
            <Link
              to="profile"
              className="flex items-center justify-start gap-2 group/sidebar py-2"
            >
              <img
                src="https://avatars.githubusercontent.com/u/174824123"
                className="h-8 w-8 shrink-0 rounded-full"
                width={90}
                height={90}
                alt="Avatar"
              />
              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? "inline-block"
                      : "none"
                    : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                transition={{ duration: 0.12 }}
                className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0 font-bold"
              >
                Shahan V Saleem
              </motion.span>
            </Link>
          </div>
        </motion.div>

        <div
          className={cn(
            "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-800 w-full"
          )}
        >
          <div className="flex justify-end z-20 w-full">
            <IconMenu2
              className="text-neutral-200"
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                  "fixed h-full w-full inset-0 bg-neutral-900 p-10 z-50 flex flex-col justify-between"
                )}
              >
                <div
                  className="absolute right-10 top-10 z-50 text-neutral-200"
                  onClick={() => setOpen(false)}
                  role="button"
                  aria-label="Close menu"
                >
                  <IconX />
                </div>

                <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                  <Link
                    to="/"
                    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
                  >
                    <img
                      src={logo}
                      alt="Kodecq.dev logo"
                      className="h-8 w-6 "
                    />

                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-pre text-white text-2xl font-bold"
                    >
                      Kodecq<span className="text-cyan-400">.dev</span>
                    </motion.span>
                  </Link>

                  <div className="mt-8 flex flex-col gap-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-start gap-2 group/sidebar py-2"
                      onClick={() => setOpen(false)}
                    >
                      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />
                      <span className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0">
                        Dashboard
                      </span>
                    </Link>

                    <Link
                      to="questions"
                      className="flex items-center justify-start gap-2 group/sidebar py-2"
                      onClick={() => setOpen(false)}
                    >
                      <IconMessageQuestion className="h-5 w-5 shrink-0 text-neutral-200" />
                      <span className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0">
                        Questions
                      </span>
                    </Link>

                    <Link
                      to="/profile"
                      className="flex items-center justify-start gap-2 group/sidebar py-2"
                      onClick={() => setOpen(false)}
                    >
                      <IconUserCode className="h-5 w-5 shrink-0 text-neutral-200" />
                      <span className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0">
                        Profile
                      </span>
                    </Link>

                    <button
                      className="flex items-center justify-start gap-2 group/sidebar py-2"
                      // onClick={() => setOpen(false)}
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      <IconLogout2 className="h-5 w-5 shrink-0 text-neutral-200" />
                      <span className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0 m-0">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <Link
                    to="/profile"
                    className="flex items-center justify-start gap-2 group/sidebar py-2"
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src="https://avatars.githubusercontent.com/u/174824123"
                      className="h-8 w-8 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                    <span className="text-neutral-700 dark:text-neutral-200 text-sm font-bold">
                      Shahan V Saleem
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-700 bg-neutral-900">
          <Outlet />
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm logout</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn rounded-lg bg-zinc-600/30 border border-slate-900 hover:bg-slate-800 px-5">
                No
              </button>
            </form>
            <button className="btn rounded-lg bg-red-500/30 border border-red-500 hover:bg-red-500 px-5">
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Dashboard;
