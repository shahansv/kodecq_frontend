import { FileUpload } from "@/components/ui/aceternity/FileUpload";
import { LoaderFive } from "../components/ui/aceternity/Loader";
import { authContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserDataContext";
import {
  changePassword,
  changeProfilePhoto,
  editProfile,
  getUserDetails,
  removeProfilePhoto,
} from "../services/allAPI";
import { Edit, KeyRound } from "lucide-react";

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MyQuestions from "@/components/MyQuestions";

const Profile = () => {
  const { token, removeToken } = useContext(authContext);
  const { userData, saveUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [clearUpload, setClearUpload] = useState(false);

  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login");
    }

    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      let apiResponse = await getUserDetails(reqHeader);
      if (apiResponse.status == 200) {
        setUserDetails(apiResponse.data);
      } else {
        toast.error(apiResponse.data.response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while fetching user data");
    } finally {
      setIsLoading(false);
    }
  };

  const editProfileDetails = async () => {
    try {
      if (userDetails.name == "") {
        toast.error("Name is required");
      } else {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const reqBody = {
          name: userDetails.name,
          profession: userDetails.profession,
        };
        setIsLoading(true);
        const apiResponse = await editProfile(
          userData.userId,
          reqBody,
          reqHeader,
        );

        if (apiResponse.status === 200) {
          toast.success("Profile updated successfully");
          document.getElementById("edit_profile_model").close();
          saveUserData({
            ...userData,
            name: apiResponse.data.userDetails.name,
          });
          getUserData();
        } else {
          toast.error(apiResponse.data.response.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const changeUserPassword = async () => {
    try {
      const { currentPassword, newPassword, confirmPassword } =
        changePasswordData;

      if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
        toast.error("All fields are required");
      } else {
        if (currentPassword !== userDetails.password) {
          toast.error("Current password is incorrect");
        } else {
          if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
          } else {
            const reqHeader = {
              Authorization: `Bearer ${token}`,
            };

            const reqBody = {
              password: newPassword,
            };
            setIsLoading(true);
            const apiResponse = await changePassword(
              userDetails._id,
              reqBody,
              reqHeader,
            );

            if (apiResponse.status === 200) {
              toast.success("Password updated successfully");
              removeToken();
              navigate("/");
            } else {
              toast.error(apiResponse.data.response.message);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const removeUserProfilePhoto = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      const apiResponse = await removeProfilePhoto(userDetails._id, reqHeader);
      if (apiResponse.status === 200) {
        saveUserData({
          ...userData,
          profilePhoto: apiResponse.data.userDetails.profilePhoto,
        });
        toast.success("Profile photo removed successfully");
        document.getElementById("view_profile_photo_model").close();
        getUserData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove profile photo");
    } finally {
      setIsLoading(false);
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

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("profilePhoto", files[0]);
      setIsLoading(true);
      const apiResponse = await changeProfilePhoto(
        userDetails._id,
        formData,
        reqHeader,
      );

      if (apiResponse.status === 200) {
        toast.success("Profile photo updated");
        getUserData();
        saveUserData({
          ...userData,
          profilePhoto: apiResponse.data.userDetails.profilePhoto,
        });
        setFiles([]);
        setClearUpload(true);

        document.getElementById("edit_profile_photo_model").close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative p-3 md:p-10">
        {isLoading ? (
          <div className="w-full flex justify-center items-center text-3xl border border-neutral-400 dark:border-neutral-700 rounded-3xl h-56">
            <LoaderFive text="Loading..." />
          </div>
        ) : (
          <div className="border border-neutral-400 dark:border-neutral-700 rounded-3xl w-full flex flex-col items-center gap-4 md:flex-row md:justify-between md:h-56">
            <div className="w-full flex flex-col items-center md:flex-row md:items-center md:pl-10">
              <div className="p-2 flex justify-center items-center w-auto">
                <div className="relative group">
                  <img
                    src={
                      userDetails.profilePhoto ||
                      "https://ik.imagekit.io/shahansv/kodecq/assets/NoProfilePhoto.svg?updatedAt=1767897694129"
                    }
                    alt="Profile picture"
                    className="rounded-full h-32 w-32 mt-5 md:mt-0 md:h-44 md:w-44 object-cover border"
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
                <h2 className="text-3xl font-bold">{userDetails.name}</h2>

                <h3 className="text-neutral-600 dark:text-neutral-400 font-semibold">
                  {userDetails.profession}
                </h3>
                <h3 className="text-neutral-600 dark:text-neutral-400 text-xs">
                  {userDetails.email}
                </h3>
              </div>
            </div>

            <div className="w-full flex justify-center items-center p-5 md:justify-end md:items-end">
              <button
                className="flex border border-blue-600 px-3 py-2 rounded-lg items-center font-semibold text-blue-500 dark:text-blue-100 hover:bg-blue-500 hover:text-white cursor-pointer text-sm m-2"
                onClick={() =>
                  document.getElementById("edit_profile_model").showModal()
                }
              >
                <Edit className="h-4 mr-1" />
                Edit Profile
              </button>
              {userDetails.password != "googlePassword" && (
                <button
                  className="flex border border-blue-600 px-3 py-2 rounded-lg items-center font-semibold text-blue-500 dark:text-blue-100 hover:bg-blue-500 hover:text-white cursor-pointer text-sm m-2"
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
        )}
        <MyQuestions />
      </div>

      <dialog id="edit_profile_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <h3 className="font-bold text-lg">Edit Profile</h3>

          <label
            htmlFor="name"
            className="flex flex-col text-zinc-700 dark:text-zinc-400 my-2 text-sm"
          >
            Name:
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="bg-zinc-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-400  dark:border-zinc-700/70 my-1"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </label>

          <label
            htmlFor="profession"
            className="flex flex-col text-zinc-700 dark:text-zinc-400  my-2 text-sm"
          >
            Profession:
            <input
              id="profession"
              type="text"
              placeholder="Your profession"
              className="bg-zinc-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-400  dark:border-zinc-700/70 my-1"
              value={userDetails.profession}
              onChange={(e) =>
                setUserDetails({ ...userDetails, profession: e.target.value })
              }
            />
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg dark:bg-zinc-500/30 border border-zinc-900 hover:bg-slate-800 px-5 hover:text-white">
                Cancel
              </button>
            </form>
            <button
              className="btn rounded-lg dark:bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5 text-blue-500 hover:text-white dark:text-white "
              onClick={editProfileDetails}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="change_password_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <h3 className="font-bold text-lg">Change Password</h3>

          <label className="flex flex-col text-zinc-700 dark:text-zinc-400 my-2 text-sm">
            Current password:
            <input
              type="password"
              className="bg-zinc-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-400  dark:border-zinc-700/70 my-1"
              value={changePasswordData.currentPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  currentPassword: e.target.value,
                })
              }
            />
          </label>

          <label className="flex flex-col text-zinc-700 dark:text-zinc-400 my-2 text-sm">
            New password:
            <input
              type="password"
              className="bg-zinc-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-400  dark:border-zinc-700/70 my-1"
              value={changePasswordData.newPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  newPassword: e.target.value,
                })
              }
            />
          </label>

          <label className="flex flex-col text-zinc-700 dark:text-zinc-400 my-2 text-sm">
            Confirm password:
            <input
              type="password"
              className="bg-zinc-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-lg  border border-zinc-400  dark:border-zinc-700/70 my-1"
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
              <button className="btn rounded-lg dark:bg-zinc-500/30 border border-zinc-900 hover:bg-slate-800 px-5 hover:text-white">
                Cancel
              </button>
            </form>
            <button
              className="btn rounded-lg dark:bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5 text-blue-500 hover:text-white dark:text-white "
              onClick={changeUserPassword}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="view_profile_photo_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <h3 className="font-bold text-lg mb-4">View Profile Photo</h3>

          <div className="w-full max-w-4xl mx-auto min-h-110 border border-dashed bg-white dark:bg-black border-neutral-800 rounded-lg flex flex-col justify-center items-center">
            <img
              src={
                userData.profilePhoto ||
                "https://ik.imagekit.io/shahansv/kodecq/assets/NoProfilePhoto.svg?updatedAt=1767897694129"
              }
              alt="Profile picture"
              className="rounded-full h-80 w-80 mt-5 md:mt-0 md:h-80 md:w-80 object-cover"
            />

            <div className=" mt-8 flex gap-5">
              <button
                className="btn rounded-lg dark:bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5 text-blue-500 hover:text-white dark:text-white "
                onClick={removeUserProfilePhoto}
              >
                Remove
              </button>
              <button
                className="btn rounded-lg dark:bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5 text-blue-500 hover:text-white dark:text-white "
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
              <button className="btn rounded-lg dark:bg-zinc-500/30 border border-zinc-900 hover:bg-slate-800 px-5 hover:text-white">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="edit_profile_photo_model" className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <h3 className="font-bold text-lg mb-4">Change Profile Photo</h3>

          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} clearFiles={clearUpload} />
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn rounded-lg dark:bg-zinc-500/30 border border-zinc-900 hover:bg-slate-800 px-5 hover:text-white"
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
              className="btn rounded-lg dark:bg-blue-500/30 border border-blue-500 hover:bg-blue-500 px-5 text-blue-500 hover:text-white dark:text-white "
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
