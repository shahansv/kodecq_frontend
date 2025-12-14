import { Button } from "@/components/ui/button";
import { NoiseBackground } from "@/components/ui/NoiseBackground";
import { ShootingStars } from "@/components/ui/ShootingStars";
import SparklesCore from "@/components/ui/SparklesCore";
import { googleLoginAPI, loginUser, registerUser } from "@/services/allAPI";
import { GoogleLogin } from "@react-oauth/google";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

const Auth = ({ register }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onClickRegister = async () => {
    try {
      if (
        userData.name == "" ||
        userData.email == "" ||
        userData.password == ""
      ) {
        toast.error("Please fill out the form");
      } else {
        let apiResponse = await registerUser(userData);
        if (apiResponse.status == 201) {
          toast.success(apiResponse.data.message);
          setUserData({
            name: "",
            email: "",
            password: "",
          });
          navigate("/login");
        } else {
          toast.error(apiResponse.data.message);
          console.log(apiResponse);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onClickLogin = async () => {
    if (userData.email == "" || userData.password == "") {
      toast.error("Please fill out the form");
    } else {
      try {
        let reqBody = {
          email: userData.email,
          password: userData.password,
        };

        let apiResponse = await loginUser(reqBody);
        if (apiResponse.status == 200) {
          toast.success(apiResponse.data.message);
          localStorage.setItem("token", apiResponse.data.token);
          setUserData({
            name: "",
            email: "",
            password: "",
          });
          navigate("/dashboard");
        } else {
          toast.error(apiResponse.response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        ).then((res) => res.json());

        const payload = {
          name: userInfo.name,
          email: userInfo.email,
          profilePhoto: userInfo.picture,
        };

        const apiResponse = await googleLoginAPI(payload);

        if (apiResponse.status === 200 || apiResponse.status === 201) {
          toast.success(apiResponse.data.message);
          localStorage.setItem("token", apiResponse.data.token);
          navigate("/dashboard");
        } else {
          toast.error("Google login failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      }
    },
    onError: () => {
      toast.error("Google login cancelled");
    },
  });

  const decodeFunction = async (credentialResponse) => {
    let decodedData = jwtDecode(credentialResponse.credential);
    let payLoad = {
      name: decodedData.name,
      email: decodedData.email,
      profilePhoto: decodedData.picture,
    };
    let apiResponse = await googleLoginAPI(payLoad);
    if (apiResponse.status == 201 || apiResponse.status == 200) {
      toast.success(apiResponse.data.message);
      localStorage.setItem("token", apiResponse.data.token);
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong on the server");
    }
  };

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
          {register ? (
            <>
              <h1 className="text-3xl font-bold mb-1">Create an account</h1>
              <p className="mb-10 text-xs text-neutral-400">
                Please enter your details to create an account
              </p>
              <label
                htmlFor="name"
                className="flex flex-col w-full text-zinc-500 my-2 text-sm"
              >
                Full Name
                <input
                  type="text"
                  id="name"
                  className="bg-neutral-900 text-neutral-300 rounded-lg px-2 py-3 mt-1 focus:outline-sky-500 outline-1 outline-neutral-800 font-semibold tracking-wide"
                  placeholder="Enter your full name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </label>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
              <p className="mb-10 text-xs text-neutral-400">
                Please enter your details to sign in
              </p>
            </>
          )}

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
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </label>

          {register ? (
            <Button
              className="bg-zinc-900 border border-neutral-300/40 font-bold hover:bg-neutral-200 hover:text-neutral-800  cursor-pointer my-5 active:scale-95 w-full"
              onClick={onClickRegister}
            >
              Register
            </Button>
          ) : (
            <Button
              className="bg-zinc-900 border border-neutral-300/40 font-bold hover:bg-neutral-200 hover:text-neutral-800  cursor-pointer my-5 active:scale-95 w-full"
              onClick={onClickLogin}
            >
              Login
            </Button>
          )}

          <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-neutral-500 to-transparent dark:via-neutral-700" />

          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-sm">
              <button
                onClick={() => googleLogin()}
                type="button"
                className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 font-medium text-black bg-zinc-900 hover:bg-neutral-800 cursor-pointer active:scale-95 transition"
              >
                <IconBrandGoogleFilled className="h-5 w-5 text-neutral-300" />
                <span className="text-sm text-neutral-300">
                  Continue with Google
                </span>
              </button>
            </div>

            {register ? (
              <>
                <p className="text-xs text-neutral-400 text-center mt-3">
                  Already have an account?
                  <Link
                    to={"/login"}
                    className="text-cyan-400 hover:text-cyan-500 mx-1 font-semibold"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-neutral-400 text-center mt-3">
                  Don't have an account yet?
                  <Link
                    to={"/register"}
                    className="text-cyan-400 hover:text-cyan-500 mx-1 font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </div>
        </section>
      </NoiseBackground>
    </div>
  );
};

export default Auth;
