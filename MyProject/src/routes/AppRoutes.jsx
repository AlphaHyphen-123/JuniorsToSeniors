import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/Layout";
import JuniorProfileCard from "../pages/JuniorProfileCard";
import React from "react";

// import JuniorProfileCreation from "../pages/JuniorProfileCreation";
// import SeniorProfileCreation from "../pages/SeniorProfileCreation"; 

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout> } />
      <Route path="/register" element={<Layout><Registration /></Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>}/>
      <Route path="/JuniorProfileCard" element={<Layout><JuniorProfileCard /></Layout>}/>
      {/* <Route path="/junior-profile-creation" element={<Layout><JuniorProfileCreation/></Layout>} /> */}
      {/* <Route path="/senior-profile-creation" element={<Layout><SeniorProfileCreation/></Layout>} /> */}
      <Route path="*" element={<Layout><h2>404: Page Not Found</h2></Layout>} />
      
      
    </Routes>
  );
}

export default AppRoutes;
