"use client";

import {
  useReadActiveBoardState,
  useReadBoardSate,
  useReadHideSidebarState,
  useReadShowAddTaskModalState,
  useReadShowEditBoardState,
} from "@/redux/hooks/hooks";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowSidebar from "./components/showSideBar/ShowSidebar";
import EditBoardModal from "./components/Modals/EditBoardModal";
import Board from "./components/Board/Board";
import AddTaskModal from "./components/Modals/AddTaskModal";

const Main = () => {
  const activeBoard = useReadActiveBoardState().activeBoardName;
  const activeBoardState = useReadBoardSate().boards.find(
    (board) => board.name === activeBoard
  );
  return (
    <div className="flex">
      {useReadHideSidebarState().sidebarIsShown && <Sidebar />}

      <div className="bg-primary dark:bg-primaryDark w-full overflow-hidden">
        <Navbar />
        {useReadHideSidebarState().sidebarIsShown === false && <ShowSidebar />}

        <Board />
      </div>
      {useReadShowEditBoardState().showModal && <EditBoardModal />}
      {useReadShowAddTaskModalState().showModal && <AddTaskModal />}
    </div>
  );
};

export default Main;
