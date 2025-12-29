import { SelectLanguage } from "@/components/ui/SelectLanguage";
import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";

const NewQuestion = () => {
  const [language, setLanguage] = useState("");
  return (
    <>
      <div className="bg-zinc-800/40 m-4 md:m-8 rounded-2xl flex  flex-col items-center p-4 md:p-12 ">
        <h1 className="p-5 text-3xl font-bold">Ask question</h1>

        <label htmlFor="language" className="flex flex-col text-zinc-400 my-2">
          Select Language:
          <SelectLanguage setLanguage={setLanguage} />
        </label>

        <label htmlFor="title" className="flex flex-col text-zinc-400 my-2">
          Title:
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="bg-[#1E1E1E] px-3 py-2 rounded-2xl  w-xs  md:w-2xl border border-zinc-700/70 my-1"
          />
        </label>

        <label htmlFor="Problem" className="flex flex-col text-zinc-400 my-2">
          Problem:
          <textarea
            name=""
            id="Problem"
            placeholder="Problem"
            rows={"8"}
            className="bg-[#1E1E1E] px-3 py-2 rounded-2xl w-xs md:w-2xl border border-zinc-700/70 my-1"
          ></textarea>
        </label>

        <label htmlFor="code" className="flex flex-col text-zinc-400 my-2">
          Add your code here
          <div
            className="rounded-2xl overflow-hidden pt-10 bg-[#1E1E1E] border border-zinc-700/70 my-1"
            id="code"
          >
            <Editor
              height="40vh"
              width="76vw"
              theme="vs-dark"
              language={language}
            />
          </div>
        </label>

        <div className="w-full text-end mt-8">
          <button className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-500">
            Submit
          </button>
        </div>
      </div>
   
    </>
  );
};

export default NewQuestion;
