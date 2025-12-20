import { Spotlight } from "@/components/ui/Spotlight";
import { checkWorkspaceExist, createWorkspace } from "@/services/allAPI";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [workspaceCode, setWorkspaceCode] = useState("");

  const newWorkpace = async () => {
    try {
      let apiResponse = await createWorkspace();
      if (apiResponse.status == 201) {
        navigate(`/workspace/${apiResponse.data.code}`);
      } else {
        toast.error(apiResponse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    }
  };

  const joinWorkspace = async () => {
    try {
      if (workspaceCode == "") {
        toast.error("Please enter a workspace code");
      } else {
        let apiResponse = await checkWorkspaceExist(workspaceCode);
        if (apiResponse.status == 200) {
          if (apiResponse.data.exists) {
            navigate(`/workspace/${workspaceCode}`);
          } else {
            toast.error(apiResponse.data.message);
          }
        } else {
          toast.error(apiResponse.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <div className="bg-zinc-950 h-screen w-full flex flex-col items-center md:justify-center rounded-md antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />

      <div className="h-1/3 flex flex-col justify-center md:w-240 mx-auto">
        <h1 className="text-3xl md:text-6xl font-semibold text-center mt-20">
          Real time coding collaboration for everyone
        </h1>
        <p className="text-center text-neutral-400 text-md md:text-lg font-medium mt-2 md:mt-5 px-5 md:px-32">
          Code together, communicate instantly, and build from anywhere with
          Kodecq.dev
        </p>
      </div>

      <div className="h-1/3 flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-6 md:gap-4">
        <button
          className="border border-blue-700 bg-blue-600/45 px-4 py-2 rounded-lg font-semibold flex gap-2 hover:bg-blue-600/80 cursor-pointer"
          onClick={newWorkpace}
        >
          <IconPlus /> New Workspace
        </button>

        <div className="border w-11/12 border-neutral-900 md:hidden" />

        <div className="flex items-center">
          <input
            type="text"
            className="bg-neutral-800 px-3 py-2 rounded-lg w-75 md:w-60 placeholder:text-neutral-500 text-neutral-300 focus:outline-blue-500 focus:outline-1"
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
  );
};

export default DashboardHome;
