"use client";

import { useReadHideSidebarState } from "@/redux/hooks/hooks";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowSidebar from "./components/showSideBar/ShowSidebar";

const Main = () => {
  return (
    <div className="flex">
      {useReadHideSidebarState().sidebarIsShown && <Sidebar />}
      <div className="bg-primary dark:bg-primaryDark w-full">
        <Navbar />
        {useReadHideSidebarState().sidebarIsShown === false && <ShowSidebar />}
      </div>
    </div>
  );
};

export default Main;
