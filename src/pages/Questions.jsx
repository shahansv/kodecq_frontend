import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "../components/ui/Combobox";
import { PlaceholdersAndVanishInput } from "../components/ui/PlaceholdersAndVanishInput";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Questions = () => {
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
        <PlaceholdersAndVanishInput placeholders={placeholders} />
      </div>
      <div className="px-5 flex justify-end">
        <ComboboxDemo />
      </div>

      <div className="p-5">
        <div className="bg-neutral-900 rounded-2xl p-3 my-5">
          <div className="flex items-center gap-2 m-2">
            <img
              src="https://avatars.githubusercontent.com/u/174824123"
              className="h-8 w-8 shrink-0 rounded-full"
              alt="Avatar"
            />
            <h4 className="text-zinc-200">
              Shahan V Saleem{" "}
              <span className="text-zinc-500">(Software Developer)</span>
            </h4>
          </div>
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-5 ml-2 text-cyan-400/80">
              problem
            </h1>
            <div className="badge badge-soft badge-warning px-3">
              JavaScript
            </div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-3">
            <h2 className="text-zinc-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Reprehenderit quam laboriosam, est molestiae dolorem
              repellat eius numquam provident molestias ea, possimus
              voluptatibus ratione temporibus. Cupiditate quo, sit fugit
              possimus aut atque blanditiis, distinctio perspiciatis dignissimos
              rerum voluptatum dolor dolorem cumque modi qui libero, nostrum nam
              quos reprehenderit veniam sint iste.
            </h2>
          </div>
          <div className="text-end mt-3">
            <button className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-500">
              Open
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
