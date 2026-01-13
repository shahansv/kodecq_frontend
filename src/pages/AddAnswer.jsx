import { LoaderFive } from "@/components/ui/aceternity/Loader";
import { authContext } from "@/context/AuthContext";
import { userDataContext } from "@/context/UserDataContext";
import { addAnswer } from "@/services/allAPI";
import { Editor } from "@monaco-editor/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddAnswer = () => {
  const { token } = useContext(authContext);
  const { theme, userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [answerData, setAnswerData] = useState({
    answer: "",
    code: "",
    userId: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }

    if (userData) {
      setAnswerData((prev) => ({
        ...prev,
        userId: userData.userId,
      }));
    }
  }, []);

  const addNewAnswer = async () => {
    try {
      if (answerData.answer == "") {
        toast.error("Please fill with your answer");
      } else {
        let reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        setIsLoading(true);
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
        <div className="bg-zinc-100 dark:bg-zinc-800/40 m-4 md:m-7 rounded-2xl flex  flex-col items-center p-4  ">
          <h1 className="p-5 text-3xl font-bold">Your Answer</h1>

          <label htmlFor="answer" className="flex flex-col text-zinc-400 my-1">
            Answer:
            <textarea
              name=""
              id="answer"
              placeholder="Answer"
              rows={"5"}
              className="dark:bg-[#1E1E1E] bg-white px-3 py-2 rounded-lg w-md md:w-2xl border border-cyan-800/30  dark:border-neutral-700 my-1 text-neutral-900 dark:text-neutral-100"
              value={answerData.answer}
              onChange={(e) =>
                setAnswerData({ ...answerData, answer: e.target.value })
              }
            ></textarea>
          </label>

          <label htmlFor="code" className="flex flex-col text-zinc-400 my-1">
            Add your code here
            <div
              className="rounded-lg overflow-hidden pt-10 bg-white dark:bg-[#1E1E1E] border border-cyan-800/30  dark:border-neutral-700 my-1"
              id="code"
            >
              <Editor
                height="40vh"
                width="70vw"
                theme={theme == "dark" ? "vs-dark" : "vs-light"}
                defaultLanguage={state.language}
                value={answerData.code}
                onChange={(value) =>
                  setAnswerData({ ...answerData, code: value })
                }
              />
            </div>
          </label>

          <div className="w-full text-end mt-5">
            <button
              className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-500"
              onClick={addNewAnswer}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAnswer;
