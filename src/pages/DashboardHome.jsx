import { checkWorkspaceExist, createWorkspace } from "../services/allAPI";
import { authContext } from "../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Spotlight } from "../components/ui/aceternity/Spotlight";
import { LoaderFive } from "../components/ui/aceternity/Loader";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { token } = useContext(authContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [workspaceCode, setWorkspaceCode] = useState("");

  const newWorkpace = async () => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      let apiResponse = await createWorkspace(reqHeader);
      if (apiResponse.status == 201) {
        navigate(`/workspace/${apiResponse.data.code}`);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  const joinWorkspace = async () => {
    try {
      if (workspaceCode == "") {
        toast.error("Please enter a workspace code");
      } else {
        let reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        setIsLoading(true);
        let apiResponse = await checkWorkspaceExist(workspaceCode, reqHeader);
        if (apiResponse.status == 200) {
          if (apiResponse.data.exists) {
            navigate(`/workspace/${workspaceCode}`);
          } else {
            toast.error(apiResponse.response.data.message);
          }
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

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center text-3xl">
          <LoaderFive text="Loading..." />
        </div>
      ) : (
        <div className="bg-zinc-100/10 dark:bg-zinc-950 h-screen w-full flex flex-col items-center md:justify-center rounded-md antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight />

          <div className="h-1/3 flex flex-col justify-center md:w-240 mx-auto">
            <h1 className="text-3xl md:text-6xl font-semibold text-center mt-20">
              Real time coding collaboration for everyone
            </h1>
            <p className="text-center text-neutral-400 text-md md:text-lg font-medium mt-2 md:mt-5 px-5 md:px-32">
              Code together in shared workspaces, see every change instantly,
              and build from anywhere with Kodecq.
            </p>
          </div>

          <div className="h-1/3 flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-6 md:gap-4">
            <button
              className="border border-blue-700 bg-blue-600/80 dark:bg-blue-600/45 text-white px-4 py-2 rounded-lg font-semibold flex gap-2 hover:bg-blue-600/80 cursor-pointer"
              onClick={newWorkpace}
            >
              <Plus /> New Workspace
            </button>

            <div className="border w-11/12 border-neutral-900 md:hidden" />

            <div className="flex items-center">
              <input
                type="text"
                className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-500  px-3 py-2 rounded-lg w-75 md:w-60 placeholder:text-neutral-500 text-neutral-300 focus:outline-blue-500 focus:outline-1"
                placeholder="Enter a room code"
                onChange={(e) => setWorkspaceCode(e.target.value)}
              />
              <button
                className="font-semibold text-blue-400 hover:text-blue-500 px-3 py-2 rounded-lg md:ml-2 cursor-pointer"
                onClick={joinWorkspace}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHome;
