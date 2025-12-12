import { Edit } from "lucide-react";
import React from "react";

const Profile = () => {
  return (
    <div className="relative p-3 md:p-10 ">
      <div className="border border-neutral-700 rounded-3xl w-full flex flex-col items-center gap-4 md:flex-row md:justify-between md:h-56">
        <div className="w-full flex flex-col items-center md:flex-row md:items-center md:pl-10">
          <div className="p-2 flex justify-center items-center w-auto">
            <img
              src="https://avatars.githubusercontent.com/u/174824123"
              alt="Profile picture of Shahan V Saleem"
              className="rounded-full h-32 w-32 mt-5 md:mt-0 md:h-48 md:w-48 object-cover"
            />
          </div>

          <div className="w-auto flex flex-col justify-center pl-0 text-center md:pl-3 md:text-left">
            <h2 className="text-3xl font-bold">Shahan V Saleem</h2>

            <h3 className="text-neutral-400 font-semibold">
              Software Developer
            </h3>
            <h3 className="text-neutral-400 text-xs">
              shahanvsaleem@gmail.com
            </h3>
            <h3 className="text-neutral-400 text-xs">Trivandrum, India</h3>
          </div>
        </div>

        <div className="w-full flex justify-center items-center p-5 md:justify-end md:items-end">
          <div>
            <button className="flex border border-blue-600 px-3 py-2 rounded-2xl items-center font-semibold text-blue-100 hover:bg-blue-500 hover:text-white cursor-pointer">
              <Edit className="h-5 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="border border-neutral-700 rounded-3xl w-full items-center gap-4 mt-5  p-3">
        <h1 className="text-2xl font-bold m-3">Questions Asked</h1>

        <div className="bg-neutral-900 rounded-2xl p-3 my-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-5 ml-2">
              How to do this problem
            </h1>
            <div className="badge badge-soft badge-warning px-3">
              JavaScript
            </div>
          </div>
          <div className="bg-neutral-800 rounded-xl p-3">
            <h2>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quam laboriosam, est molestiae dolorem repellat eius numquam provident molestias ea, possimus voluptatibus ratione temporibus. Cupiditate quo, sit fugit possimus aut atque blanditiis, distinctio perspiciatis dignissimos rerum voluptatum dolor dolorem cumque modi qui libero, nostrum nam quos reprehenderit veniam sint iste.
            </h2>
          </div>
          <div className="text-end mt-3">
            <button className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-2xl text-sm cursor-pointer hover:bg-blue-500">
              Open
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-3 my-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-5 ml-2">
              How to do this problem
            </h1>
            <div className="badge badge-soft badge-warning px-3">
              JavaScript
            </div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-3">
            <h2>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              voluptate.
            </h2>
          </div>
          <div className="text-end mt-3">
            <button className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-2xl text-sm cursor-pointer hover:bg-blue-500">
              Open
            </button>
          </div>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-3 my-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-5 ml-2">
              How to do this problem
            </h1>
            <div className="badge badge-soft badge-warning px-3">
              JavaScript
            </div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-3">
            <h2>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, natus sit corrupti vitae doloribus sapiente possimus velit earum architecto hic illo facere aliquid rerum! Qui nam aliquid excepturi consequuntur minus?
            </h2>
          </div>
          <div className="text-end mt-3">
            <button className="bg-blue-500/40 border border-blue-600 px-3 py-2 rounded-2xl text-sm cursor-pointer hover:bg-blue-500">
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
