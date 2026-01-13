import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getGoogleUserInfo,
  googleLoginAPI,
  loginUser,
  registerUser,
} from "../services/allAPI";
import { authContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserDataContext";
import { useGoogleLogin } from "@react-oauth/google";
import { SparklesCore } from "../components/ui/aceternity/Sparkles";
import { ShootingStars } from "../components/ui/aceternity/ShootingStart";
import { NoiseBackground } from "../components/ui/aceternity/NoiseBackground";
import { LoaderFive } from "../components/ui/aceternity/Loader";

const Auth = ({ register }) => {
  const navigate = useNavigate();
  const { saveToken } = useContext(authContext);
  const { theme, saveUserData } = useContext(userDataContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onClickRegister = async () => {
    try {
      if (
        userData.name == "" ||
        userData.email == "" ||
        userData.password == ""
      ) {
        toast.error("Please fill in all required fields");
      } else {
        setIsLoading(true);
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
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickLogin = async () => {
    try {
      if (userData.email == "" || userData.password == "") {
        toast.error("Please fill in all required fields");
      } else {
        let reqBody = {
          email: userData.email,
          password: userData.password,
        };
        setIsLoading(true);
        let apiResponse = await loginUser(reqBody);
        if (apiResponse.status == 200) {
          saveToken(apiResponse.data.token);
          saveUserData(apiResponse.data.user);
          setUserData({
            name: "",
            email: "",
            password: "",
          });
          navigate("/dashboard");
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let reqHeader = {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        };
        setIsLoading(true);
        let GoogleApiResponse = await getGoogleUserInfo(reqHeader);

        if (GoogleApiResponse.status == 200) {
          let userInfo = GoogleApiResponse.data;
          let payload = {
            name: userInfo.name,
            email: userInfo.email,
            profilePhoto: userInfo.picture,
          };
          setIsLoading(true);
          let apiResponse = await googleLoginAPI(payload);

          if (apiResponse.status === 200 || apiResponse.status === 201) {
            saveToken(apiResponse.data.token);
            saveUserData(apiResponse.data.user);
            navigate("/dashboard");
          } else {
            toast.error("Google login failed");
          }
        } else {
          toast.error("Google user info failed to fetch");
        }
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center bg-black/80 items-center text-3xl">
          <LoaderFive text="Loading..." />
        </div>
      ) : (
        <div className="h-screen relative w-full dark:bg-black flex flex-col items-center justify-center overflow-hidden ">
          <div className="w-full absolute inset-0 h-screen">
            <SparklesCore
              id="authPage"
              background={theme == "dark" ? "#000" : "#FFF"}
              minSize={0.6}
              maxSize={1.4}
              particleDensity={30}
              className="w-full h-full transition"
              particleColor={theme == "dark" ? "#53EAFD" : "#000"}
            />
            <ShootingStars starColor={theme == "dark" ? "#53EAFD" : "#000"} />
          </div>
          <NoiseBackground
            containerClassName="w-fit p-2 mx-auto"
            gradientColors={[
              "rgb(255, 100, 150)",
              "rgb(100, 150, 255)",
              "rgb(255, 200, 100)",
            ]}
          >
            <section className="dark:bg-neutral-950 bg-transparent  flex flex-col items-center  w-100 md:w-100 rounded-2xl p-10 z-50">
              {register ? (
                <>
                  <h1 className="text-3xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">
                    Create an account
                  </h1>
                  <p className="mb-10 text-xs text-neutral-800 dark:text-neutral-400">
                    Please enter your details to create an account
                  </p>
                  <label
                    htmlFor="name"
                    className="flex flex-col w-full text-neutral-800 dark:text-neutral-400 my-2 text-sm"
                  >
                    Full Name
                    <input
                      type="text"
                      id="name"
                      className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 placeholder:text-neutral-600  rounded-lg px-2 py-3 mt-1 focus:outline-black outline-2  outline-neutral-200 dark:outline-neutral-800 dark:focus:outline-neutral-200  font-semibold tracking-wide"
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
                  <h1 className="text-3xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">
                    Welcome Back
                  </h1>
                  <p className="mb-10 text-xs text-neutral-800 dark:text-neutral-400">
                    Please enter your details to sign in
                  </p>
                </>
              )}

              <label
                htmlFor="email"
                className="flex flex-col w-full text-neutral-800 dark:text-neutral-400 my-2 text-sm"
              >
                Email
                <input
                  type="email"
                  id="email"
                  className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 placeholder:text-neutral-600  rounded-lg px-2 py-3 mt-1 focus:outline-black outline-2  outline-neutral-200 dark:outline-neutral-800 dark:focus:outline-neutral-200  font-semibold tracking-wide"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </label>

              <label
                htmlFor="password"
                className="flex flex-col w-full text-neutral-800 dark:text-neutral-400 my-2 text-sm"
              >
                Password
                <input
                  type="password"
                  id="password"
                  className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 placeholder:text-neutral-600  rounded-lg px-2 py-3 mt-1 focus:outline-black outline-2  outline-neutral-200 dark:outline-neutral-800 dark:focus:outline-neutral-200  font-semibold tracking-wide"
                  placeholder="Enter your password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </label>

              {register ? (
                <button
                  className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-400 dark:border-neutral-900 font-semibold hover:bg-neutral-900 dark:hover:bg-zinc-800 text-neutral-900 dark:text-neutral-200  hover:text-neutral-100  cursor-pointer my-5 active:scale-95 w-full px-3 py-2 rounded-lg transition"
                  onClick={onClickRegister}
                >
                  Register
                </button>
              ) : (
                <button
                  className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-400 dark:border-neutral-900 font-semibold hover:bg-neutral-900 dark:hover:bg-zinc-800 text-neutral-900 dark:text-neutral-200  hover:text-neutral-100  cursor-pointer my-5 active:scale-95 w-full px-3 py-2 rounded-lg transition"
                  onClick={onClickLogin}
                >
                  Login
                </button>
              )}

              <div className="my-4 h-px w-full bg-linear-to-r from-transparent via-neutral-500 to-transparent dark:via-neutral-700" />

              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-sm">
                  <button
                    onClick={() => googleLogin()}
                    type="button"
                    className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 font-semibold text-black bg-zinc-900 hover:bg-neutral-800 cursor-pointer active:scale-95 transition"
                  >
                    <img
                      src="https://ik.imagekit.io/shahansv/kodecq/assets/Google.svg"
                      alt="google logo"
                      className="h-5 w-5"
                    />
                    <span className="text-sm text-neutral-300">
                      Continue with Google
                    </span>
                  </button>
                </div>

                {register ? (
                  <>
                    <p className="text-xs text-neutral-800 dark:text-neutral-400 text-center mt-3">
                      Already have an account?
                      <Link
                        to={"/login"}
                        className="text-cyan-500 hover:text-cyan-600 mx-1 font-bold"
                      >
                        Sign in
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-neutral-800 dark:text-neutral-400 text-center mt-3">
                      Don't have an account yet?
                      <Link
                        to={"/register"}
                        className="text-cyan-500 hover:text-cyan-600 mx-1 font-bold"
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
      )}
    </>
  );
};

export default Auth;
