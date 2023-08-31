'use client'
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
import useUpdateStore from "./lib/useUpdateStore";
import { switchSidebar } from "@/redux/stores/HideSidebar";

const Main = () => {
  const {store, updateData} = useUpdateStore()



  return (

      <div className="bg-primary dark:bg-primaryDark w-screen h-screen flex">
        <div>
          <Sidebar />
        </div>

        <div className="w-full">
          <Navbar />
          <h1>{store.selectedBoardName.selectedBoardName}</h1>
        </div>
      </div>

  );
};

export default Main;
