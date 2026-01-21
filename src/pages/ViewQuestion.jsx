import { deleteAnswer, viewQuestion } from "../services/allAPI";
import { authContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserDataContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderFive } from "../components/ui/aceternity/Loader";
import { Plus } from "lucide-react";
import Code from "../components/Code";

const ViewQuestion = () => {
  const { id } = useParams();

  const { token } = useContext(authContext);
  const { userData } = useContext(userDataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }
    getQuestionAndAnswers();
  }, []);

  const getQuestionAndAnswers = async () => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      let apiResponse = await viewQuestion(id, reqHeader);
      if (apiResponse.status == 200) {
        setQuestion(apiResponse.data.question);
        setAnswers(apiResponse.data.answers);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMyAnswer = async (answerId) => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      let apiResponse = await deleteAnswer(answerId, reqHeader);
      if (apiResponse.status == 200) {
        toast.success("Answer deleted");
        getQuestionAndAnswers();
      } else {
        toast.error(apiResponse.response.data.message);
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
        <>
          <div className="bg-neutral-100 dark:bg-neutral-800/15 border border-cyan-400 dark:border-cyan-500/10 rounded-2xl p-6 my-5 m-8 mx-16">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 m-2">
                <img
                  src={question?.askedBy?.profilePhoto}
                  className="h-8 w-8 shrink-0 rounded-full"
                  alt={question?.askedBy.name}
                />
                <h4>
                  {question?.askedBy.name}
                  <span className="text-zinc-500 mx-1">
                    {question?.askedBy.profession
                      ? "(" + question?.askedBy.profession + ")"
                      : ""}
                  </span>
                </h4>
              </div>
              {question?.language == "javascript" ? (
                <div>
                  <h3 className="bg-[#F7E01D] text-yellow-700 border border-yellow-700 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    JavaScript
                  </h3>
                </div>
              ) : question?.language == "typescript" ? (
                <div>
                  <h3 className="bg-[#017ACC] text-indigo-200 border border-indigo-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    TypeScript
                  </h3>
                </div>
              ) : question?.language == "python" ? (
                <div>
                  <h3 className="bg-[#FED646] text-amber-700 border border-amber-700 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    Python
                  </h3>
                </div>
              ) : question?.language == "java" ? (
                <div>
                  <h3 className="bg-[#EA6D00] text-orange-200 border border-orange-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    Java
                  </h3>
                </div>
              ) : question?.language == "c" ? (
                <div>
                  <h3 className="bg-[#00599D] text-blue-200 border border-blue-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    C
                  </h3>
                </div>
              ) : question?.language == "cpp" ? (
                <div>
                  <h3 className="bg-[#1B598F] text-blue-200 border border-blue-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    C++
                  </h3>
                </div>
              ) : question?.language == "csharp" ? (
                <div>
                  <h3 className="bg-[#3A0091] text-purple-200 border border-purple-200 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    C#
                  </h3>
                </div>
              ) : question?.language == "go" ? (
                <div>
                  <h3 className="bg-[#00ACD9] text-cyan-100 border border-cyan-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    Go
                  </h3>
                </div>
              ) : question?.language == "php" ? (
                <div>
                  <h3 className="bg-[#777BB3] text-indigo-100 border border-indigo-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    PHP
                  </h3>
                </div>
              ) : question?.language == "rust" ? (
                <div>
                  <h3 className="bg-[#CD422A] text-orange-100 border border-orange-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    Rust
                  </h3>
                </div>
              ) : (
                <div>
                  <h3 className="bg-zinc-800 text-zinc-100 border border-zinc-100 px-3 py-0.5 rounded-full text-xs font-bold mr-2">
                    {question?.language}
                  </h3>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <h1 className="text-xl font-bold mb-5 ml-2 text-cyan-400/80">
                {question?.title}
              </h1>
            </div>
            <div className="bg-zinc-200/50 dark:bg-zinc-800 rounded-xl p-3">
              <h2 className="">{question?.problem}</h2>
            </div>
            {question?.code && (
              <div className="mt-5 rounded-lg overflow-hidden">
                <Code
                  sourceCode={question?.code}
                  language={question?.language}
                />
              </div>
            )}
            <div className="flex justify-between items-end mt-5">
              <h4 className="text-sm text-zinc-600">
                {new Date(question?.createdAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h4>
            </div>
            <div></div>
          </div>
          <div className="mx-9">
            <h1 className="text-2xl font-semibold">Answers</h1>
            <div className="flex justify-end">
              <Link
                to={`/dashboard/addAnswer/${id}`}
                state={{ language: question?.language }}
                className="bg-blue-500 border border-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-600 active:scale-95 transition flex  items-center"
              >
                <Plus className="h-5" />
                Add your aswers
              </Link>
            </div>
            {answers.length > 0 ? (
              <>
                {answers.map((eachAnswer, index) => (
                  <div key={index}>
                    <div className="bg-neutral-100 dark:bg-neutral-800/15 border border-cyan-400 dark:border-cyan-500/10 rounded-2xl p-6 my-5 m-8">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2 m-2">
                          <img
                            src={eachAnswer.answeredBy?.profilePhoto}
                            className="h-8 w-8 shrink-0 rounded-full"
                            alt={eachAnswer.answeredBy.name}
                          />
                          <h4>
                            {eachAnswer.answeredBy.name}
                            <span className="text-zinc-500 mx-1">
                              {eachAnswer.answeredBy.profession
                                ? "(" + eachAnswer.answeredBy.profession + ")"
                                : ""}
                            </span>
                            <span className="text-zinc-500">
                              {userData.userId == eachAnswer.answeredBy?._id
                                ? "(You)"
                                : ""}
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl p-3 mt-4">
                        <h2 className="text-zinc-800 dark:text-zinc-200">
                          {eachAnswer?.answer}
                        </h2>
                      </div>
                      {eachAnswer?.code && (
                        <div className="mt-5 rounded-lg overflow-hidden">
                          <Code
                            sourceCode={eachAnswer?.code}
                            language={question?.language}
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-end mt-5">
                        <h4 className="text-sm text-zinc-600">
                          {new Date(eachAnswer?.createdAt).toLocaleString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                        </h4>
                        <div>
                          {userData.userId == eachAnswer.answeredBy?._id ? (
                            <div>
                              <button
                                className="bg-red-500/10 dark:bg-red-500/40 border border-red-600 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-red-500 mx-1 "
                                onClick={() => deleteMyAnswer(eachAnswer._id)}
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1 className="text-red-500 text-center text-xl font-semibold">
                  No one has answered yet
                </h1>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewQuestion;
