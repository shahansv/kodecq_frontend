import { Button } from "@/components/ui/button";
import { NoiseBackground } from "@/components/ui/NoiseBackground";
import { ShootingStars } from "@/components/ui/ShootingStars";
import SparklesCore from "@/components/ui/SparklesCore";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import React from "react";

const Auth = () => {
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#53EAFD"
        />
        <ShootingStars />
      </div>
      <NoiseBackground
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}
      >
        <section className="bg-neutral-950  flex flex-col items-center  w-100 md:w-100 rounded-2xl p-10 z-50">
          <h1 className="text-3xl font-bold mb-12">Register</h1>

          <label
            htmlFor="username"
            className="flex flex-col w-full text-zinc-500 my-2 text-sm"
          >
            Username
            <input
              type="text"
              id="username"
              className="bg-neutral-900 text-neutral-300 rounded-lg px-2 py-3 mt-1 focus:outline-sky-500 outline-1 outline-neutral-800 font-semibold tracking-wide"
              placeholder="Enter your username"
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col w-full text-zinc-500 my-2 text-sm"
          >
            Password
            <input
              type="password"
              id="password"
              className="bg-neutral-900 text-neutral-300 rounded-lg px-2 py-3 mt-1 focus:outline-sky-500 outline-1 outline-neutral-800 font-semibold tracking-wide"
              placeholder="Enter your password"
            />
          </label>
          <label
            htmlFor="email"
            className="flex flex-col w-full text-zinc-500 my-2 text-sm"
          >
            Email
            <input
              type="email"
              id="email"
              className="bg-neutral-900 text-neutral-300 rounded-lg px-2 py-3 mt-1 focus:outline-sky-500 outline-1 outline-neutral-800 font-semibold tracking-wide"
              placeholder="Enter your email"
            />
          </label>
          <Button className="bg-zinc-900 border border-neutral-300/40 font-bold hover:bg-neutral-200 hover:text-neutral-800 hover:scale-105 cursor-pointer my-5 active:scale-100 w-full">
            Register
          </Button>

          <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4 w-full mb-4">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 font-medium text-black bg-zinc-900 hover:bg-neutral-800 cursor-pointer"
              type="submit"
            >
              <IconBrandGithub className="h-5 w-5 text-neutral-300" />
              <span className="text-sm text-neutral-300">
                Sign up with GitHub
              </span>
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 font-medium text-black bg-zinc-900 hover:bg-neutral-800 cursor-pointer"
              type="submit"
            >
              <IconBrandGoogleFilled className="h-5 w-5 text-neutral-300" />
              <span className="text-sm text-neutral-300">
                Sign up with Google
              </span>
            </button>
          </div>
        </section>
      </NoiseBackground>
    </div>
  );
};

export default Auth;
