import { getQuestions } from "@/services/allAPI";
import { LoaderFive } from "../components/ui/aceternity/Loader";
import { authContext } from "../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { PlaceholdersAndVanishInput } from "../components/ui/aceternity/PlaceholdersAndVanishInput";
import { userDataContext } from "@/context/UserDataContext";
import { FilterByLanguage } from "@/components/FilterByLanguage";

const Questions = () => {
  const navigate = useNavigate();
  const { token } = useContext(authContext);
  const { userData } = useContext(userDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [copyQuestionData, setCopyQuestionData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllQuestions();
    }
  }, [searchKey]);

  useEffect(() => {
    if (selectedLanguage === "all") {
      getAllQuestions();
    } else {
      const filtered = copyQuestionData.filter(
        (question) => question.language === selectedLanguage,
      );
      setQuestionData(filtered);
    }
  }, [selectedLanguage]);

  const getAllQuestions = async () => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      let apiResponse = await getQuestions(reqHeader, searchKey);
      if (apiResponse.status == 200) {
        setQuestionData(apiResponse.data.questionData);
        setCopyQuestionData(apiResponse.data.questionData);
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

  const placeholders = [
    "How do I check if a variable is undefined in JavaScript?",
    "How do I define a simple interface in TypeScript?",
    "How do I read user input from the command line in Python?",
    "How do I create and use a simple class in Java?",
    "How do I loop through an array in C++?",
  ];

  return (
    <>
      <div className="p-5 flex justify-end">
        <Link to="/dashboard/add_question">
          <button className="flex  px-3 py-2 rounded-lg bg-cyan-300/20 border border-cyan-400 font-semibold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer transition">
            Ask Questions
            <Plus />
          </button>
        </Link>
      </div>
      <div className="p-6 flex  items-center">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          setSearchKey={setSearchKey}
        />
      </div>
      <div className="px-5 flex justify-end">
        <FilterByLanguage onLanguageChange={setSelectedLanguage} />
      </div>

      <div className="p-5">
        {isLoading ? (
          <div className="h-96 w-full flex justify-center items-center text-3xl">
            <LoaderFive text="Loading..." />
          </div>
        ) : (
          <>
            {questionData?.length > 0 ? (
              <>
                {questionData.map((eachQuestion, index) => (
                  <div
                    key={index}
                    className="bg-neutral-100/50 dark:bg-neutral-800/15 rounded-2xl p-3 my-5 border border-cyan-400 dark:border-cyan-500/10"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 m-2">
                        <img
                          src={eachQuestion.askedBy.profilePhoto}
                          className="h-8 w-8 shrink-0 rounded-full"
                          alt={eachQuestion.askedBy.name}
                        />
                        <h4>
                          {eachQuestion.askedBy.name}
                          <span className="text-zinc-500 mx-1">
                            {eachQuestion.askedBy.profession
                              ? "(" + eachQuestion.askedBy.profession + ")"
                              : ""}
                          </span>
                          <span className="text-zinc-500">
                            {userData.userId == eachQuestion.askedBy?._id
                              ? "(You)"
                              : ""}
                          </span>
                        </h4>
                      </div>
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
                    <div className="flex justify-between">
                      <h1 className="text-xl font-bold mb-5 ml-2 text-shadow-cyan-900 dark:text-cyan-400/80 ">
                        {eachQuestion.title}
                      </h1>
                    </div>
                    <div className="bg-neutral-200/50 dark:bg-zinc-800 rounded-xl p-3">
                      <h2 className="dark:text-zinc-200">
                        {eachQuestion.problem}
                      </h2>
                    </div>
                    <div className="flex justify-between items-end mt-5">
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
                          },
                        )}
                      </h4>

                      <Link
                        to={`/dashboard/questions/${eachQuestion._id}`}
                        className="bg-blue-500 border border-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-600 active:scale-95 transition"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1 className="text-center text-2xl font-semibold text-red-500">
                  No questions found!
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Questions;
