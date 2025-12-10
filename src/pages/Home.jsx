import React from "react";
import { SparklesCore } from "../components/ui/Sparkles";
import { FlipWords } from "../components/ui/FlipWords";
import { HoverBorderGradient } from "../components/ui/HoverBorderGradient";
import { Link } from "react-router-dom";
import AutoIDE from "../components/ui/AutoIDE";
import { GlowingEffect } from "../components/ui/GlowingEffect";
import GlowingEffectDemo from "../components/ui/BentoGrid";
import Cover from "../components/ui/Cover";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ShootingStars } from "@/components/ui/ShootingStars";

const Home = () => {
  const words = ["faster", "smarter", "better", "cleaner", "together"];
  return (
    <>
      <Header />
      <section className="h-screen md:h-180 relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpagn"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#53EAFD"
          />
          <ShootingStars />
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white leading-tight relative z-20 mb-2">
          Build
          <FlipWords words={words} /> <br />
          with a shared workspace
        </h1>
        <Link to={"/"}>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-black  text-white font-semibold flex items-center space-x-2 cursor-pointer"
          >
            <span>Get started</span>
          </HoverBorderGradient>
        </Link>
      </section>

      <section className="grid sm:grid-cols-1 md:grid-cols-2 h-180 px-10">
        <div className="flex items-center ">
          <h1 className="text-3xl md:text-3xl lg:text-6xl font-semibold max-w-7xl mx-auto mt-6 relative z-20 py-6 text-white">
            A collaborative IDE that improves teamwork at <br /> at{" "}
            <span className="mt-2">
              <Cover>warp speed</Cover>
            </span>
          </h1>
        </div>
        <div className=" flex items-center justify-center ">
          <AutoIDE />
        </div>
      </section>
      <section className="px-10">
        <GlowingEffectDemo />
      </section>
      <ScrollButton />
      <Footer />
    </>
  );
};

export default Home;
