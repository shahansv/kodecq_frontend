import { FileUpload } from "@/components/ui/FileUpload";
import { Edit } from "lucide-react";
import React, { useState } from "react";

const Profile = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <>
      <div className="relative p-3 md:p-10 ">
        <div className="border border-neutral-700 rounded-3xl w-full flex flex-col items-center gap-4 md:flex-row md:justify-between md:h-56">
          <div className="w-full flex flex-col items-center md:flex-row md:items-center md:pl-10">
            <div className="p-2 flex justify-center items-center w-auto">
              <div className="relative group">
                <img
                  src="https://avatars.githubusercontent.com/u/174824123"
                  alt="Profile picture"
                  className="rounded-full h-32 w-32 mt-5 md:mt-0 md:h-48 md:w-48 object-cover"
                />
                <div
                  className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  <Edit className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="w-auto flex flex-col justify-center pl-0 text-center md:pl-3 md:text-left">
              <h2 className="text-3xl font-bold">Shahan V Saleem</h2>

              <h3 className="text-neutral-400 font-semibold">
                Software Developer
              </h3>
              <h3 className="text-neutral-400 text-xs">
                shahanvsaleem@gmail.com
              </h3>
            </div>
          </div>

          <div className="w-full flex justify-center items-center p-5 md:justify-end md:items-end">
            <div>
              <button
                className="flex border border-blue-600 px-3 py-2 rounded-xl items-center font-semibold text-blue-100 hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <Edit className="h-5 mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="border border-neutral-700 rounded-3xl w-full items-center gap-4 mt-5  p-3">
          <h1 className="text-2xl font-bold m-3">Your Asked</h1>

          <div className="bg-neutral-900 rounded-2xl p-3 my-5">
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aliquid, voluptate. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Reprehenderit quam laboriosam, est molestiae
                dolorem repellat eius numquam provident molestias ea, possimus
                voluptatibus ratione temporibus. Cupiditate quo, sit fugit
                possimus aut atque blanditiis, distinctio perspiciatis
                dignissimos rerum voluptatum dolor dolorem cumque modi qui
                libero, nostrum nam quos reprehenderit veniam sint iste.
              </h2>
            </div>
            <div className="text-end mt-3">
              <button className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-500 mx-1">
                Open
              </button>
              <button className="bg-zinc-500/40 border border-zinc-600 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-zinc-500 mx-1">
                Edit
              </button>
              <button className="bg-red-500/40 border border-red-600 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-red-500 mx-1">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-800">
          <h3 className="font-bold text-lg">Edit Profile</h3>

          <label
            htmlFor="name"
            className="flex flex-col text-zinc-400 my-2 text-sm"
          >
            Name:
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-700/70 my-1"
            />
          </label>

          <label
            htmlFor="profession"
            className="flex flex-col text-zinc-400 my-2 text-sm"
          >
            Profession:
            <input
              id="profession"
              type="text"
              placeholder="Your profession"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-700/70 my-1"
            />
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-zinc-600/30 border border-zinc-900 hover:bg-slate-800 px-5">
                Cancel
              </button>
            </form>
            <button className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5">
              Save
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-900">
          <h3 className="font-bold text-lg mb-4">Change Profile Photo</h3>

          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-zinc-600/30 border border-zinc-900 hover:bg-slate-800 px-5">
                Cancel
              </button>
            </form>
            <button className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5">
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Profile;
