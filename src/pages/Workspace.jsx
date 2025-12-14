import DropdownMenuRadioGroupDemo from "@/components/SelectLanguage";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import { Button } from "@/components/ui/StatefulButton";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "@/constants";
import { executeCode } from "@/services/allAPI";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Workspace = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setCode(CODE_SNIPPETS[language]);
  }, [language]);

  const onSelectLanguage = (lang) => {
    setLanguage(lang);
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

  return (
    <div className="h-screen bg-zinc-950">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg">
        <ResizablePanel defaultSize={60}>
          <div className="p-2 flex justify-between">
            <DropdownMenuRadioGroupDemo
              language={language}
              onSelectLanguage={onSelectLanguage}
            />
           
            <Button
              className="bg-blue-500/20 px-3 py-1 rounded-md border border-blue-500 text-sm hover:bg-blue-500 active:scale-95 font-semibold text-blue-100 h-8" 
              onClick={runCode}
            >
              Run code
            </Button>
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
              <div className="p-6">
                <div
                  className={`font-semibold ${
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
  );
};

export default Workspace;
