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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/Tooltip";

const Workspace = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }
  }, []);

  useEffect(() => {
    setCode(CODE_SNIPPETS[language]);
  }, [language]);

  const onSelectLanguage = (lang) => {
    setLanguage(lang);
  };

  const { workspaceID } = useParams();
  console.log(workspaceID);

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
    } else {
      try {
        let reqBody = {
          language: language,
          version: LANGUAGE_VERSIONS[language],
          files: [
            {
              content: code,
            },
          ],
        };
        let apiResponse = await executeCode(reqBody);
        if (apiResponse.status == 200) {
          let result = apiResponse.data.run;
          setOutput(result.output.split("\n"));
          result.stderr ? setIsError(true) : setIsError(false);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
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

  return (
    <>
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
                    <button
                      className="bg-zinc-500/20 px-3 py-1 rounded-md border border-zinc-600 text-sm hover:bg-zinc-200 active:scale-95 font-semibold text-zinc-100 hover:text-zinc-700 h-8 flex items-center cursor-pointer"
                      onClick={copyWorkspaceCode}
                    >
                      <Copy className="h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Workspace code</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="bg-zinc-500/20 px-3 py-1 rounded-md border border-zinc-600 text-sm hover:bg-zinc-200 active:scale-95 font-semibold text-zinc-100 hover:text-zinc-700 h-8 mx-2 flex items-center cursor-pointer"
                      onClick={() => downloadCode(code, language)}
                    >
                      <Download className="h-4" />
                    </button>
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
              onChange={(value) => setCode(value || "")}
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
                  <span className="font-semibold">Voice & Video</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default Workspace;
