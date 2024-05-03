import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab");
    if(tab) {
      setTab(tab);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="mx-auto w-full">
        {/* porfile */}
        {tab === "profile" && <DashProfile />}
        {/* posts */}
        {tab === "posts" && <DashPosts />}
      </div>
    </div>
  );
}
