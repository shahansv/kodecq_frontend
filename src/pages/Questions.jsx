import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "../components/ui/Combobox";
import { PlaceholdersAndVanishInput } from "../components/ui/PlaceholdersAndVanishInput";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuestions } from "@/services/allAPI";

const Questions = () => {
  const [questionData, setQuestionData] = useState([]);
  const [copyQuestionData, setCopyQuestionData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getAllQuestions();
    }
  }, [searchKey]);

  useEffect(() => {
    if (selectedLanguage === "all") {
      getAllQuestions();
    } else {
      const filtered = copyQuestionData.filter(
        (question) => question.language === selectedLanguage
      );
      setQuestionData(filtered);
    }
  }, [selectedLanguage]);

  const getAllQuestions = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getQuestions(header, searchKey);
      if (apiResponse.status == 200) {
        setQuestionData(apiResponse.data.questionData);
        setCopyQuestionData(apiResponse.data.questionData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <Button className="bg-cyan-300/20 border border-cyan-400 font-bold hover:bg-cyan-400 hover:text-cyan-900 hover:scale-105 cursor-pointer">
            Ask Questions
            <Plus />
          </Button>
        </Link>
      </div>
      <div className="p-6 flex  items-center">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          setSearchKey={setSearchKey}
        />
      </div>
      <div className="px-5 flex justify-end">
        <ComboboxDemo onLanguageChange={setSelectedLanguage} />
      </div>

      <div className="p-5">
        {questionData?.length > 0 ? (
          <>
            {questionData.map((eachQuestion, index) => (
              <div key={index} className="bg-neutral-900 rounded-2xl p-3 my-5">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 m-2">
                    <img
                      src={eachQuestion.askedBy.profilePhoto}
                      className="h-8 w-8 shrink-0 rounded-full"
                      alt="Avatar"
                    />
                    <h4 className="text-zinc-200">
                      {eachQuestion.askedBy.name}
                      <span className="text-zinc-500 mx-1">
                        {eachQuestion.askedBy.profession
                          ? "(" + eachQuestion.askedBy.profession + ")"
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
                  <h1 className="text-xl font-bold mb-5 ml-2 text-cyan-400/80">
                    {eachQuestion.title}
                  </h1>
                </div>
                <div className="bg-zinc-800 rounded-xl p-3">
                  <h2 className="text-zinc-200">{eachQuestion.problem}</h2>
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
                      }
                    )}
                  </h4>

                  <Link
                    to={`/question/${eachQuestion._id}`}
                    className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-500"
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
      </div>
    </>
  );
};

export default Questions;
