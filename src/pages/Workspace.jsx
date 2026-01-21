import {
  CODE_SNIPPETS,
  LANGUAGE_EXTENSIONS,
  LANGUAGE_VERSIONS,
} from "../constants";
import { authContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserDataContext";
import { executeCode } from "../services/allAPI";
import socket from "../services/socket";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/shadcn/Tooltip";
import { Copy, Download, LogOut } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/shadcn/Resizable";
import SetLanguage from "../components/SetLanguage";
import { LoaderButton } from "../components/ui/shadcn/StatefulButton";
import Code from "@/components/Code";

const Workspace = () => {
  const { workspaceID } = useParams();
  const { token } = useContext(authContext);
  const { theme, userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const isRemoteUpdate = useRef(false);
  const isRemoteLanguageUpdate = useRef(false);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }
  }, []);

  useEffect(() => {
    if (!isRemoteLanguageUpdate.current) {
      setCode(CODE_SNIPPETS[language]);
    } else {
      isRemoteLanguageUpdate.current = false;
    }
  }, [language]);

  useEffect(() => {
    if (!workspaceID || !userData) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joinWorkspace", {
      workspaceID,
      user: {
        userId: userData.userId,
        name: userData.name,
        profilePhoto: userData.profilePhoto,
      },
    });

    const handleCodeUpdate = (updatedCode) => {
      isRemoteUpdate.current = true;
      setCode(updatedCode);
    };

    const handleUserJoined = (user) => {
      toast.success(`${user.name} joined the workspace`);
    };

    const handleUserLeft = (user) => {
      toast.error(`${user.name} left the workspace`);
    };

    const handleWorkspaceUsers = (users) => {
      setUsers(users);
    };

    const handleLanguageUpdate = (newLanguage) => {
      isRemoteLanguageUpdate.current = true;
      setLanguage(newLanguage);
      setCode(CODE_SNIPPETS[newLanguage]);
    };

    const handleRunResultUpdate = ({ output }) => {
      setOutput(output || "");
    };

    socket.on("codeUpdate", handleCodeUpdate);
    socket.on("userJoined", handleUserJoined);
    socket.on("userLeft", handleUserLeft);
    socket.on("workspaceUsers", handleWorkspaceUsers);
    socket.on("languageUpdate", handleLanguageUpdate);
    socket.on("runResultUpdate", handleRunResultUpdate);

    return () => {
      socket.off("codeUpdate", handleCodeUpdate);
      socket.off("userJoined", handleUserJoined);
      socket.off("userLeft", handleUserLeft);
      socket.off("workspaceUsers", handleWorkspaceUsers);
      socket.off("languageUpdate", handleLanguageUpdate);
      socket.off("runResultUpdate", handleRunResultUpdate);
    };
  }, [workspaceID]);

  const onSetLanguage = (lang) => {
    if (isRemoteLanguageUpdate.current) {
      isRemoteLanguageUpdate.current = false;
      setLanguage(lang);
      return;
    }

    setLanguage(lang);

    socket.emit("languageChange", {
      workspaceID,
      language: lang,
    });
  };

  const copyWorkspaceCode = async () => {
    try {
      await navigator.clipboard.writeText(workspaceID);
      toast.success("Workspace code copied!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const runCode = async () => {
    if (!code) {
      toast.error("Nothing to execute");
      return;
    }

    try {
      let reqBody = {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [{ content: code }],
      };

      let apiResponse = await executeCode(reqBody);

      if (apiResponse.status === 200) {
        let result = apiResponse.data.run;
        const formattedOutput = result.output || result.stderr || "";
        const error = !!result.stderr;

        setOutput(formattedOutput);

        socket.emit("runResult", {
          workspaceID,
          output: formattedOutput,
          isError: error,
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    }
  };

  const downloadCode = (code, language) => {
    const extension = LANGUAGE_EXTENSIONS[language] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `index.${extension}`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCodeChange = (value) => {
    const newCode = value || "";

    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      setCode(newCode);
      return;
    }

    setCode(newCode);

    socket.emit("codeChange", {
      workspaceID,
      code: newCode,
    });
  };
  return (
    <>
      <div className="h-screen bg-zinc-100 dark:bg-zinc-900">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg">
          <ResizablePanel defaultSize={60}>
            <div className="p-2 flex justify-between">
              <SetLanguage language={language} onSetLanguage={onSetLanguage} />

              <div className="flex">
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="dark:bg-zinc-500/20 bg-zinc-100 px-3 py-1 rounded-md border border-zinc-500 text-sm hover:bg-zinc-500 dark:hover:bg-zinc-500 active:scale-95 font-semibold  h-8 hover:text-white flex items-center justify-center mx-2"
                      onClick={() => downloadCode(code, language)}
                    >
                      <Download className="h-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download source code</p>
                  </TooltipContent>
                </Tooltip>

                <LoaderButton
                  className="dark:bg-blue-500/20 bg-blue-100 px-3 py-1 rounded-md border border-blue-500 text-sm hover:bg-blue-500 dark:hover:bg-blue-500 active:scale-95 font-semibold  h-8 hover:text-white"
                  onClick={runCode}
                >
                  Run code
                </LoaderButton>
              </div>
            </div>

            <Editor
              height="100vh"
              theme={theme == "dark" ? "vs-dark" : "vs-light"}
              language={language}
              value={code}
              onChange={handleCodeChange}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={40} className="bg-zinc-900">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={55}>
                <div className="p-4 h-full overflow-y-auto bg-white dark:bg-[#1E1E1E]">
                  {output ? (
                    <Code
                      sourceCode={output}
                      language="text"
                      showLineNumbers={false}
                    />
                  ) : (
                    <p className="text-gray-500 font-semibold">
                      Click "Run code" to see the output here
                    </p>
                  )}
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={45}>
                <div className="flex h-full flex-col p-4 bg-zinc-100 dark:bg-zinc-800">
                  <h3 className="font-semibold mb-4 text-center">
                    <span className="mx-1">{users.length}</span>
                    Users in workspace
                  </h3>

                  <div className="flex-1 overflow-y-auto relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-20">
                      {users.map((user) => (
                        <div
                          key={user.socketId}
                          className="flex items-center gap-4 p-4
                        rounded-lg bg-zinc-200 dark:bg-zinc-900
                        border border-zinc-400 dark:border-zinc-800
                        hover:border-zinc-600
                        transition"
                        >
                          <img
                            src={user.profilePhoto}
                            alt={user.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />

                          <span className="font-medium">{user.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sticky bottom-0 flex justify-center mt-4">
                    <div
                      className="flex items-center gap-3
                    px-4 py-3 rounded-xl bg-zinc-100
                    dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800
                    backdrop-blur"
                    >
                      <button
                        className="px-4 py-2 rounded-md
                      bg-red-600 hover:bg-red-500 text-white
                      text-sm font-medium transition flex items-center  cursor-pointer
                      whitespace-nowrap"
                        onClick={() =>
                          document
                            .getElementById("leave_workspace_model")
                            .showModal()
                        }
                      >
                        <LogOut className="h-4" />
                        Leave workspace
                      </button>

                      <button
                        className="px-4 py-2 rounded-md
                      bg-neutral-600 hover:bg-neutral-500 text-white
                      text-sm font-medium transition flex items-center  cursor-pointer
                      whitespace-nowrap"
                        onClick={copyWorkspaceCode}
                      >
                        <Copy className="h-4" />
                        Copy workspace code
                      </button>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <dialog id="leave_workspace_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-200 dark:bg-zinc-800 ">
          <h3 className="font-bold text-lg">Leave workspace</h3>
          <p className="pt-4">Are you sure you want to leave this workspace?</p>
          <p className="py-1 text-zinc-600 dark:text-zinc-300">
            After leaving this workspace, you won't be able to access the code
            written here. Please save your work by downloading or copying it
            before leaving.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-slate-600 border border-slate-900 hover:bg-slate-800 px-5 text-slate-50">
                Cancel
              </button>
            </form>
            <Link
              to={"/dashboard"}
              className="rounded-lg bg-red-500  px-5 text-white cursor-pointer active:scale-95 font-semibold flex justify-center items-center"
            >
              Leave
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Workspace;
