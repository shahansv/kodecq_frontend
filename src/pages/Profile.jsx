import { FileUpload } from "@/components/ui/FileUpload";
import {
  changePassword,
  changeProfilePhoto,
  editProfile,
  getUserDetails,
  removeProfilePhoto,
} from "@/services/allAPI";
import { Edit, KeyRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [clearUpload, setClearUpload] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    try {
      let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getUserDetails(reqHeader);
      if (apiResponse.status == 200) {
        setUserData(apiResponse.data);
      } else {
        toast.error(apiResponse.data.response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while fetching user data");
    }
  };

  const editProfileDetails = async () => {
    try {
      if (userData.name == "") {
        toast.error("Name is required");
      } else {
        const token = localStorage.getItem("token");
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const reqBody = {
          name: userData.name,
          profession: userData.profession,
        };

        const apiResponse = await editProfile(userData._id, reqBody, reqHeader);

        if (apiResponse.status === 200) {
          toast.success("Profile updated successfully");
          document.getElementById("edit_profile_model").close();
          const user = JSON.parse(localStorage.getItem("user"));
          user.name = apiResponse.data.userDetails.name;
          localStorage.setItem("user", JSON.stringify(user));
          userDetails();
        } else {
          toast.error(apiResponse.data.response.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const changeUserPassword = async () => {
    try {
      const { currentPassword, newPassword, confirmPassword } =
        changePasswordData;

      if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
        toast.error("All fields are required");
      } else {
        if (currentPassword !== userData.password) {
          toast.error("Current password is incorrect");
        } else {
          if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
          } else {
            const token = localStorage.getItem("token");
            const reqHeader = {
              Authorization: `Bearer ${token}`,
            };

            const reqBody = {
              password: newPassword,
            };

            const response = await changePassword(
              userData._id,
              reqBody,
              reqHeader
            );

            if (response.status === 200) {
              toast.success("Password updated successfully");
              localStorage.clear();
              navigate("/");
            } else {
              toast.error(response.data.response.message);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const removeUserProfilePhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const apiResponse = await removeProfilePhoto(userData._id, reqHeader);
      if (apiResponse.status === 200) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.profilePhoto = apiResponse.data.userDetails.profilePhoto;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Profile photo removed successfully");
        userDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove profile photo");
    }
  };

  const handleFileUpload = (files) => {
    setFiles(files);
    setClearUpload(false);
  };

  const uploadProfilePhoto = async () => {
    try {
      if (!files || files.length === 0) {
        toast.error("Please select an image");
        return;
      }

      const token = localStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("profilePhoto", files[0]);

      const apiResponse = await changeProfilePhoto(
        userData._id,
        formData,
        reqHeader
      );

      if (apiResponse.status === 200) {
        toast.success("Profile photo updated");
        userDetails();
        const user = JSON.parse(localStorage.getItem("user"));
        user.profilePhoto = apiResponse.data.userDetails.profilePhoto;
        localStorage.setItem("user", JSON.stringify(user));
        setFiles([]);
        setClearUpload(true);

        document.getElementById("edit_profile_photo_model").close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <>
      <div className="relative p-3 md:p-10 ">
        <div className="border border-neutral-700 rounded-3xl w-full flex flex-col items-center gap-4 md:flex-row md:justify-between md:h-56">
          <div className="w-full flex flex-col items-center md:flex-row md:items-center md:pl-10">
            <div className="p-2 flex justify-center items-center w-auto">
              <div className="relative group">
                <img
                  src={
                    userData.profilePhoto ||
                    "https://ik.imagekit.io/shahansv/Kodecq/assets/NoProfilePicture.png"
                  }
                  alt="Profile picture"
                  className="rounded-full h-32 w-32 mt-5 md:mt-0 md:h-44 md:w-44 object-cover"
                />
                <div
                  className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={() =>
                    document
                      .getElementById("view_profile_photo_model")
                      .showModal()
                  }
                >
                  <Edit className="h-7 w-7 text-zinc-200" />
                </div>
              </div>
            </div>

            <div className="w-auto flex flex-col justify-center pl-0 text-center md:pl-3 md:text-left">
              <h2 className="text-3xl font-bold">{userData.name}</h2>

              <h3 className="text-neutral-400 font-semibold">
                {userData.profession}
              </h3>
              <h3 className="text-neutral-400 text-xs">{userData.email}</h3>
            </div>
          </div>

          <div className="w-full flex justify-center items-center p-5 md:justify-end md:items-end">
            <button
              className="flex border border-blue-600 px-3 py-2 rounded-lg items-center font-semibold text-blue-100 hover:bg-blue-500 hover:text-white cursor-pointer text-sm m-2"
              onClick={() =>
                document.getElementById("edit_profile_model").showModal()
              }
            >
              <Edit className="h-4 mr-1" />
              Edit Profile
            </button>
            {userData.password != "googlePassword" && (
              <button
                className="flex border border-blue-600 px-3 py-2 rounded-lg items-center font-semibold text-blue-100 hover:bg-blue-500 hover:text-white cursor-pointer text-sm m-2"
                onClick={() =>
                  document.getElementById("change_password_model").showModal()
                }
              >
                <KeyRound className="h-4 mr-1" />
                Change password
              </button>
            )}
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
      <dialog id="edit_profile_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-800">
          <h3 className="font-bold text-lg">Edit Profile</h3>

          <label
            htmlFor="name"
            className="flex flex-col text-zinc-300 my-2 text-sm"
          >
            Name:
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-700/70 my-1 text-white"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </label>

          <label
            htmlFor="profession"
            className="flex flex-col text-zinc-300 my-2 text-sm"
          >
            Profession:
            <input
              id="profession"
              type="text"
              placeholder="Your profession"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-700/70 my-1 text-white"
              value={userData.profession}
              onChange={(e) =>
                setUserData({ ...userData, profession: e.target.value })
              }
            />
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-zinc-500/30 border border-zinc-900 hover:bg-slate-800 px-5">
                Cancel
              </button>
            </form>
            <button
              className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5"
              onClick={editProfileDetails}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="change_password_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-800">
          <h3 className="font-bold text-lg">Change Password</h3>

          <label className="flex flex-col text-zinc-300 my-2 text-sm">
            Current password:
            <input
              type="password"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg border border-zinc-700/70 my-1 text-white"
              value={changePasswordData.currentPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  currentPassword: e.target.value,
                })
              }
            />
          </label>

          <label className="flex flex-col text-zinc-300 my-2 text-sm">
            New password:
            <input
              type="password"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg border border-zinc-700/70 my-1 text-white"
              value={changePasswordData.newPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  newPassword: e.target.value,
                })
              }
            />
          </label>

          <label className="flex flex-col text-zinc-300 my-2 text-sm">
            Confirm password:
            <input
              type="password"
              className="bg-[#1E1E1E] px-3 py-2 rounded-lg border border-zinc-700/70 my-1 text-white"
              value={changePasswordData.confirmPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-zinc-700/30 border border-zinc-900 hover:bg-slate-800 px-5">
                Cancel
              </button>
            </form>
            <button
              className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5"
              onClick={changeUserPassword}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="view_profile_photo_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-900">
          <h3 className="font-bold text-lg mb-4">View Profile Photo</h3>

          <div className="w-full max-w-4xl mx-auto min-h-110 border border-dashed bg-black border-neutral-800 rounded-lg flex flex-col justify-center items-center">
            <img
              src={
                userData.profilePhoto ||
                "https://ik.imagekit.io/shahansv/Kodecq/assets/NoProfilePicture.png"
              }
              alt="Profile picture"
              className="rounded-full h-80 w-80 mt-5 md:mt-0 md:h-80 md:w-80 object-cover"
            />

            <div className=" mt-8 flex gap-5">
              <button
                className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5"
                onClick={removeUserProfilePhoto}
              >
                Remove
              </button>
              <button
                className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5"
                onClick={() => {
                  document.getElementById("view_profile_photo_model").close();
                  document
                    .getElementById("edit_profile_photo_model")
                    .showModal();
                }}
              >
                Change
              </button>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg bg-zinc-600/30 border border-zinc-900 hover:bg-slate-800 px-5">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="edit_profile_photo_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-900">
          <h3 className="font-bold text-lg mb-4">Change Profile Photo</h3>

          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} clearFiles={clearUpload} />
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn rounded-lg bg-zinc-600/30 border border-zinc-900 hover:bg-slate-800 px-5"
                onClick={() => {
                  document
                    .getElementById("view_profile_photo_model")
                    .showModal();
                  document.getElementById("edit_profile_photo_model").close();
                }}
              >
                Cancel
              </button>
            </form>
            <button
              className="btn rounded-lg bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5"
              onClick={uploadProfilePhoto}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Profile;
