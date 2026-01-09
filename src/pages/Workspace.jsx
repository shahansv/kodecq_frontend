import DropdownMenuRadioGroupDemo from "../components/SelectLanguage";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/Resizable";
import { Button } from "../components/ui/StatefulButton";
import {
  CODE_SNIPPETS,
  LANGUAGE_EXTENSIONS,
  LANGUAGE_VERSIONS,
} from "@/constants";
import { executeCode } from "../services/allAPI";
import { Editor } from "@monaco-editor/react";
import { Copy, Download } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/Tooltip";
import socket from "../services/socket";

const Workspace = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const isRemoteUpdate = useRef(false);
  const navigate = useNavigate();
  const { workspaceID } = useParams();
  const [users, setUsers] = useState([]);

  const isRemoteLanguageUpdate = useRef(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let token = localStorage.getItem("token");
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
    if (!workspaceID || !currentUser) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joinWorkspace", {
      workspaceID,
      user: {
        userId: currentUser.userId,
        name: currentUser.name,
        profilePhoto: currentUser.profilePhoto,
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

    const handleRunResultUpdate = ({ output, isError }) => {
      setOutput(output);
      setIsError(isError);
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

  const onSelectLanguage = (lang) => {
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
        const formattedOutput = result.output.split("\n");
        const error = !!result.stderr;

        setOutput(formattedOutput);
        setIsError(error);

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
    <div className="h-screen bg-zinc-900">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg">
        <ResizablePanel defaultSize={60}>
          <div className="p-2 flex justify-between">
            <DropdownMenuRadioGroupDemo
              language={language}
              onSelectLanguage={onSelectLanguage}
            />

            <div className="flex">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="bg-zinc-500/20 px-3 py-1 rounded-md border border-zinc-600 text-sm hover:bg-zinc-100 active:scale-95 font-semibold text-zinc-100 hover:text-zinc-700 h-8 flex items-center cursor-pointer"
                    onClick={copyWorkspaceCode}
                  >
                    <Copy className="h-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Workspace code</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="bg-zinc-500/20 px-3 py-1 rounded-md border border-zinc-600 text-sm hover:bg-zinc-100 active:scale-95 font-semibold text-zinc-100 hover:text-zinc-700 h-8 mx-2 flex items-center cursor-pointer"
                    onClick={() => downloadCode(code, language)}
                  >
                    <Download className="h-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download source code</p>
                </TooltipContent>
              </Tooltip>

              <Button
                className="bg-blue-500/20 px-3 py-1 rounded-md border border-blue-500 text-sm hover:bg-blue-500 active:scale-95 font-semibold text-blue-100 h-8"
                onClick={runCode}
              >
                Run code
              </Button>
            </div>
          </div>

          <Editor
            height="100vh"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={handleCodeChange}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={40} className="bg-zinc-900">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={55}>
              <div className="p-6 h-full">
                <div
                  className={`font-semibold h-full overflow-y-auto ${
                    isError
                      ? "text-red-500"
                      : output
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {output
                    ? output.map((line, index) => <p key={index}>{line}</p>)
                    : 'Click "Run code" to see the output here'}
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={45}>
              <div className="flex h-full items-center justify-center p-6">
                <div className="w-full h-full p-4 overflow-y-auto">
                  <h3 className="font-semibold mb-4 text-center">
                    Users in Workspace
                  </h3>

                  {users.length === 0 && (
                    <p className="text-center text-zinc-400">No users yet</p>
                  )}

                  {users.map((user) => (
                    <div
                      key={user.socketId}
                      className="flex items-center gap-3 mb-3 p-3 rounded-md bg-zinc-800 border border-zinc-700"
                    >
                      <img
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />

                      <span className="text-zinc-100 font-medium">
                        {user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Workspace;
