"use client";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import useUpdateStore from "./lib/useUpdateStore";
import { switchSidebar } from "@/redux/stores/HideSidebar";
import Board from "@/components/Board/Board";
import { AiFillEye } from "react-icons/ai";
const Main = () => {
  const { store, updateData } = useUpdateStore();

  return (
    <div className="bg-primary dark:bg-primaryDark w-screen h-screen flex overflow-hidden">



      {store.showSidebar.showSidebar === true && (
        <div>
          <Sidebar />
        </div>
      )}


      <div className="w-full" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Navbar />
        {store.showSidebar.showSidebar === false && (
          <button
            className="hidden md:block absolute bottom-4 bg-action p-2 rounded-r-2xl"
            onClick={() => updateData(switchSidebar(true))}
          >
            <AiFillEye className="w-6 h-6 text-white" />
          </button>
        )}
        <Board />
      </div>






    </div>
  );
};

export default Main;
