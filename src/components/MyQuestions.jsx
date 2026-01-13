import { deleteQuestion, getMyQuestions } from "../services/allAPI";
import { authContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserDataContext";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LoaderFive } from "./ui/aceternity/Loader";

const MyQuestions = () => {
  const { token } = useContext(authContext);
  const { userData } = useContext(userDataContext);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }

    getUserQuestions();
  }, []);

  const getUserQuestions = async () => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      let apiResponse = await getMyQuestions(userData.userId, reqHeader);
      if (apiResponse.status == 200) {
        setQuestions(apiResponse.data.myQuestions);
      } else {
        toast.error(apiResponse.data.response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching questions");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMyQuestion = async (id) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      const apiResponse = await deleteQuestion(id, reqHeader);
      if (apiResponse.status === 200) {
        toast.success("Question deleted successfully");
        getUserQuestions();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className=" w-full flex justify-center items-center text-3xl border border-neutral-400 dark:border-neutral-700 rounded-3xl h-56">
          <LoaderFive text="Loading..." />
        </div>
      ) : (
        <div className="border border-neutral-400 dark:border-neutral-700 rounded-3xl w-full items-center gap-4 mt-5  p-3">
          <h1 className="text-2xl font-bold m-3">Asked questions</h1>
          {questions.length > 0 ? (
            <>
              {questions.map((eachQuestion, index) => (
                <div
                  key={index}
                  className="bg-neutral-100 dark:bg-neutral-800/15 rounded-2xl p-3 my-5 border border-cyan-400 dark:border-cyan-500/10"
                >
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold mb-5 ml-2 text-shadow-cyan-900 dark:text-cyan-400/80 ">
                      {eachQuestion.title}
                    </h1>
                    {eachQuestion.language == "javascript" ? (
                      <div>
                        <h3 className="bg-[#F7E01D] text-yellow-700 border border-yellow-700 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          JavaScript
                        </h3>
                      </div>
                    ) : eachQuestion.language == "typescript" ? (
                      <div>
                        <h3 className="bg-[#017ACC] text-indigo-200 border border-indigo-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          TypeScript
                        </h3>
                      </div>
                    ) : eachQuestion.language == "python" ? (
                      <div>
                        <h3 className="bg-[#FED646] text-amber-700 border border-amber-700 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          Python
                        </h3>
                      </div>
                    ) : eachQuestion.language == "java" ? (
                      <div>
                        <h3 className="bg-[#EA6D00] text-orange-200 border border-orange-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          Java
                        </h3>
                      </div>
                    ) : eachQuestion.language == "c" ? (
                      <div>
                        <h3 className="bg-[#00599D] text-blue-200 border border-blue-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          C
                        </h3>
                      </div>
                    ) : eachQuestion.language == "cpp" ? (
                      <div>
                        <h3 className="bg-[#1B598F] text-blue-200 border border-blue-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          C++
                        </h3>
                      </div>
                    ) : eachQuestion.language == "csharp" ? (
                      <div>
                        <h3 className="bg-[#3A0091] text-purple-200 border border-purple-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          C#
                        </h3>
                      </div>
                    ) : eachQuestion.language == "go" ? (
                      <div>
                        <h3 className="bg-[#00ACD9] text-cyan-100 border border-cyan-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          Go
                        </h3>
                      </div>
                    ) : eachQuestion.language == "php" ? (
                      <div>
                        <h3 className="bg-[#777BB3] text-indigo-100 border border-indigo-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          PHP
                        </h3>
                      </div>
                    ) : eachQuestion.language == "rust" ? (
                      <div>
                        <h3 className="bg-[#CD422A] text-orange-100 border border-orange-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          Rust
                        </h3>
                      </div>
                    ) : (
                      <div>
                        <h3 className="bg-zinc-800 text-zinc-100 border border-zinc-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                          {eachQuestion.language}
                        </h3>
                      </div>
                    )}
                  </div>
                  <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl p-3">
                    <h2 className="dark:text-zinc-200">
                      {eachQuestion.problem}
                    </h2>
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <h4 className="text-sm text-zinc-600">
                      {new Date(eachQuestion.createdAt).toLocaleString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </h4>
                    <div>
                      <Link
                        to={`/dashboard/questions/${eachQuestion._id}`}
                        className="border px-3 py-2 rounded-lg text-sm cursor-pointer mx-1 border-blue-600 text-blue-500 dark:text-blue-100 hover:bg-blue-500 hover:text-white "
                      >
                        Open
                      </Link>

                      <Link
                        to={`/dashboard/editQuestion/${eachQuestion._id}`}
                        className="border px-3 py-2 rounded-lg text-sm cursor-pointer mx-1 border-zinc-600 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-500 hover:text-white"
                      >
                        Edit
                      </Link>

                      <button
                        className="border px-3 py-2 rounded-lg text-sm cursor-pointer mx-1 border-red-600 text-red-500 dark:text-red-100 hover:bg-red-500 hover:text-white "
                        onClick={() => deleteMyQuestion(eachQuestion._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-lg text-red-500">
              No questions asked yet.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default MyQuestions;
