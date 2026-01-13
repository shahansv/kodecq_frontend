import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DashboardLayout } from "./components/DashboardLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DashboardHome from "./pages/DashboardHome";
import Questions from "./pages/Questions";
import ViewQuestion from "./pages/ViewQuestion";
import AddAnswer from "./pages/AddAnswer";
import EditQuestion from "./pages/EditQuestion";
import Profile from "./pages/Profile";
import AddQuestion from "./pages/AddQuestion";
import Workspace from "./pages/Workspace";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register={true} />} />
        <Route path="/workspace/:workspaceID" element={<Workspace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="questions" element={<Questions />} />
          <Route path="questions/:id" element={<ViewQuestion />} />
          <Route path="add_question" element={<AddQuestion />} />
          <Route path="editQuestion/:id" element={<EditQuestion />} />
          <Route path="addAnswer/:id" element={<AddAnswer />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
