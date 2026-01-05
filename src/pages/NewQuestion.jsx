import { addQuestion } from "@/services/allAPI";
import { SelectLanguage } from "../components/ui/SelectALanguage";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewQuestion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setQuestionData((prev) => ({
        ...prev,
        userId: parsedUser.userId || "",
      }));
    }
  }, []);

  const [questionData, setQuestionData] = useState({
    language: "",
    title: "",
    problem: "",
    code: "",
    userId: "",
  });

  useEffect(() => {
    console.log(questionData);
  }, [questionData]);
  const addNewQuestion = async () => {
    try {
      if (
        questionData.language == "" ||
        questionData.title == "" ||
        questionData.problem == ""
      ) {
        toast.error("Please fill in all required fields");
      } else {
        let token = localStorage.getItem("token");
        let reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        let apiResponse = await addQuestion(questionData, reqHeader);
        if (apiResponse.status == 201) {
          toast.success(apiResponse.data.message);
          setQuestionData({
            language: "",
            title: "",
            problem: "",
            code: "",
          });
          navigate("/dashboard/questions");
        } else {
          toast.error(apiResponse.responce.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <>
      <div className="bg-zinc-800/40 m-4 md:m-8 rounded-2xl flex  flex-col items-center p-4 md:p-12 ">
        <h1 className="p-5 text-3xl font-bold">Ask question</h1>

        <label htmlFor="language" className="flex flex-col text-zinc-400 my-2">
          Select Language:
          <SelectLanguage
            setLanguage={(lang) =>
              setQuestionData((prev) => ({ ...prev, language: lang }))
            }
          />
        </label>

        <label htmlFor="title" className="flex flex-col text-zinc-400 my-2">
          Title:
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="bg-[#1E1E1E] px-3 py-2 rounded-lg  w-xs  md:w-2xl border border-zinc-700/70 my-1 text-white"
            value={questionData.title}
            onChange={(e) =>
              setQuestionData({ ...questionData, title: e.target.value })
            }
          />
        </label>

        <label htmlFor="Problem" className="flex flex-col text-zinc-400 my-2">
          Problem:
          <textarea
            name=""
            id="Problem"
            placeholder="Problem"
            rows={"8"}
            className="bg-[#1E1E1E] px-3 py-2 rounded-lg w-xs md:w-2xl border border-zinc-700/70 my-1 text-white"
            value={questionData.problem}
            onChange={(e) =>
              setQuestionData({ ...questionData, problem: e.target.value })
            }
          ></textarea>
        </label>

        <label htmlFor="code" className="flex flex-col text-zinc-400 my-2">
          Add your code here
          <div
            className="rounded-lg overflow-hidden pt-10 bg-[#1E1E1E] border border-zinc-700/70 my-1"
            id="code"
          >
            <Editor
              height="40vh"
              width="70vw"
              theme="vs-dark"
              language={questionData.language}
              value={questionData.code}
              onChange={(value) =>
                setQuestionData({ ...questionData, code: value })
              }
            />
          </div>
        </label>

        <div className="w-full text-end mt-8">
          <button
            className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-500"
            onClick={addNewQuestion}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default NewQuestion;
