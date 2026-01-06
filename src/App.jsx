import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/DashboardSidebar";
import Questions from "./pages/Questions";
import Profile from "./pages/Profile";
import DashboardHome from "./pages/DashboardHome";
import Workspace from "./pages/Workspace";
import { Slide, ToastContainer } from "react-toastify";
import NewQuestion from "./pages/NewQuestion";
import ViewQuestion from "./pages/ViewQuestion";
import YourAnswer from "./pages/YourAnswer";
import EditQuestion from "./pages/EditQuestion";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register={true} />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="questions" element={<Questions />} />
          <Route path="questions/:id" element={<ViewQuestion />} />
          <Route path="addAnswer/:id" element={<YourAnswer />} />
          <Route path="editQuestion/:id" element={<EditQuestion />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add_question" element={<NewQuestion />} />
        </Route>
        <Route path="/workspace/:workspaceID" element={<Workspace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default App;
