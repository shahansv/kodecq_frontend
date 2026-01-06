import { addAnswer, addQuestion } from "@/services/allAPI";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const YourAnswer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setAnswerData((prev) => ({
        ...prev,
        userId: parsedUser.userId,
      }));
    }
  }, []);

  const [answerData, setAnswerData] = useState({
    answer: "",
    code: "",
    userId: "",
  });

  const addNewAnswer = async () => {
    try {
      if (answerData.answer == "") {
        toast.error("Please fill with your answer");
      } else {
        let token = localStorage.getItem("token");
        let reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        let apiResponse = await addAnswer(id, answerData, reqHeader);
        if (apiResponse.status == 201) {
          toast.success(apiResponse.data.message);
          setAnswerData({
            answer: "",
            code: "",
            userId: "",
          });
          navigate(`/dashboard/questions/${id}`);
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
        <h1 className="p-5 text-3xl font-bold">Your Answer</h1>

        <label htmlFor="answer" className="flex flex-col text-zinc-400 my-2">
          Answer:
          <textarea
            name=""
            id="answer"
            placeholder="Answer"
            rows={"8"}
            className="bg-[#1E1E1E] px-3 py-2 rounded-lg w-xs md:w-2xl border border-zinc-700/70 my-1 text-white"
            value={answerData.answer}
            onChange={(e) =>
              setAnswerData({ ...answerData, answer: e.target.value })
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
              defaultLanguage={state.language}
              value={answerData.code}
              onChange={(value) =>
                setAnswerData({ ...answerData, code: value })
              }
            />
          </div>
        </label>

        <div className="w-full text-end mt-8">
          <button
            className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-500"
            onClick={addNewAnswer}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default YourAnswer;
