import { editQuestion, viewQuestion } from "@/services/allAPI";
import { Editor } from "@monaco-editor/react";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditQuestion = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState({
    title: "",
    problem: "",
    code: "",
  });

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await viewQuestion(id, reqHeader);
      if (apiResponse.status == 200) {
        setQuestionData(apiResponse.data.question);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    }
  };

  const onClickEditQuestion = async () => {
    try {
      let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await editQuestion(id, questionData, reqHeader);
      if (apiResponse.status == 200) {
        toast.success("Question edited successfully");
        navigate(`/dashboard/questions/${id}`);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <>
      <div className="bg-zinc-800/40 m-4 md:m-8 rounded-2xl flex  flex-col items-center p-4 md:p-12 ">
        <h1 className="p-5 text-3xl font-bold">Edit question</h1>

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
            onClick={onClickEditQuestion}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditQuestion;
