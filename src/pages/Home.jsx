import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authContext } from "../context/AuthContext";
import { SparklesCore } from "../components/ui/aceternity/Sparkles";
import { ShootingStars } from "../components/ui/aceternity/ShootingStart";
import { FlipWords } from "../components/ui/aceternity/FlipWords";
import { Link } from "react-router-dom";
import { HoverBorderGradient } from "../components/ui/aceternity/HoverBorderGradient";
import { userDataContext } from "../context/UserDataContext";
import { Cover } from "../components/ui/aceternity/Cover";
import { HomeBentoCard } from "../components/HomeBentoCard";
import AutoIDE from "../components/AutoIDE";
import ScrollButton from "../components/ScrollButton";

const Home = () => {
  const { token } = useContext(authContext);
  const { theme } = useContext(userDataContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const words = ["faster", "smarter", "better", "cleaner", "together"];

  return (
    <>
      <Header />
      <section className="h-screen md:h-188 relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="homePage"
            background={theme == "dark" ? "#000" : "#FFF"}
            minSize={0.6}
            maxSize={1.4}
            particleDensity={30}
            className="w-full h-full transition"
            particleColor={theme == "dark" ? "#53EAFD" : "#000"}
          />
          <ShootingStars starColor={theme == "dark" ? "#53EAFD" : "#000"} />
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-neutral-900 dark:text-neutral-100 leading-tight relative z-20 mb-2">
          Build
          <FlipWords words={words} /> <br />
          with a shared workspace
        </h1>
        {isLoggedIn ? (
          <>
            <Link to={"/dashboard"}>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="font-semibold flex items-center space-x-2 cursor-pointer"
              >
                <span>Go to dashboard</span>
              </HoverBorderGradient>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/register"}>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="font-semibold flex items-center space-x-2 cursor-pointer"
              >
                <span>Get started</span>
              </HoverBorderGradient>
            </Link>
          </>
        )}
      </section>

      <section className="grid sm:grid-cols-1 md:grid-cols-2 h-180 px-10">
        <div className="flex items-center ">
          <h1 className="text-3xl text-center md:text-start md:text-3xl lg:text-6xl font-semibold max-w-7xl mx-auto mt-6 relative z-20 py-6 text-neutral-900 dark:text-neutral-100">
            A collaborative IDE that accelerates developer teamwork seamlessly
            at
            <span className="m-2">
              <Cover>warp speed</Cover>
            </span>
          </h1>
        </div>
        <div className=" flex items-center justify-center ">
          <AutoIDE />
        </div>
      </section>

      <section className="px-10">
        <HomeBentoCard />
      </section>
      <ScrollButton />

      <Footer />
    </>
  );
};

export default Home;
