import { Editor } from "@monaco-editor/react";
import { LoaderFive } from "../components/ui/aceternity/Loader";
import { authContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserDataContext";
import { addQuestion } from "../services/allAPI";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SelectLanguage } from "@/components/SelectALanguage";

const AddQuestion = () => {
  const { token } = useContext(authContext);
  const { theme, userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState({
    language: "",
    title: "",
    problem: "",
    code: "",
    userId: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }

    if (userData) {
      setQuestionData((prev) => ({
        ...prev,
        userId: userData.userId,
      }));
    }
  }, []);

  const addNewQuestion = async () => {
    try {
      if (
        questionData.language == "" ||
        questionData.title == "" ||
        questionData.problem == ""
      ) {
        toast.error("Please fill in all required fields");
      } else {
        let reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center text-3xl">
          <LoaderFive text="Loading..." />
        </div>
      ) : (
        <>
          <div className="bg-zinc-100 dark:bg-zinc-800/40 m-4 md:m-7 rounded-2xl flex  flex-col items-center p-4  ">
            <h1 className="p-5 text-3xl font-bold">Ask question</h1>

            <label
              htmlFor="language"
              className="flex flex-col text-zinc-400 my-1"
            >
              Select Language:
              <SelectLanguage
                setLanguage={(lang) =>
                  setQuestionData((prev) => ({ ...prev, language: lang }))
                }
              />
            </label>

            <label htmlFor="title" className="flex flex-col text-zinc-400 my-1">
              Title:
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="dark:bg-[#1E1E1E] bg-white px-3 py-2 rounded-lg w-md md:w-2xl border border-cyan-800/30  dark:border-neutral-700 my-1 text-neutral-900 dark:text-neutral-100"
                value={questionData.title}
                onChange={(e) =>
                  setQuestionData({ ...questionData, title: e.target.value })
                }
              />
            </label>

            <label
              htmlFor="Problem"
              className="flex flex-col text-zinc-400 my-1"
            >
              Problem:
              <textarea
                name=""
                id="Problem"
                placeholder="Problem"
                rows={"5"}
                className="dark:bg-[#1E1E1E] bg-white px-3 py-2 rounded-lg w-md md:w-2xl border border-cyan-800/30  dark:border-neutral-700 my-1 text-neutral-900 dark:text-neutral-100"
                value={questionData.problem}
                onChange={(e) =>
                  setQuestionData({ ...questionData, problem: e.target.value })
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
      )}
    </div>
  );
};

export default AddQuestion;
