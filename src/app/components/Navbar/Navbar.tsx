"use client";
import { TbBrandRedux } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useReadActiveBoardState, useReadBoardSate } from "@/redux/hooks/hooks";
import { LuClipboardList } from "react-icons/lu";
import { setActiveBoardName } from "@/redux/slices/activeBoardSlice";
import { useState } from "react";
import ThemeButton from "../ThemeButton/ThemeButton";
import { toggleShowNewBoard } from "@/redux/slices/showNearBoard";

Modal.setAppElement("#root");

const Navbar = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(
    useReadActiveBoardState().activeBoardName
  );


  return (
    <>
      <div className="w-full flex justify-between border-b p-4 bg-secondary dark:bg-primaryDark">
        <div className="flex items-center">
          <TbBrandRedux className="w-8 h-8 text-action md:hidden" />
          <h1 className="line-clamp-1 max-w-[220px] text-xl dark:text-white">
            {useReadActiveBoardState().activeBoardName || "Select Board"}
          </h1>
          <RiArrowDropDownLine
            className="w-8 h-8 text-textGray md:hidden"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="flex items-center">
          <button className="btn">+</button>
          <BsThreeDotsVertical className="w-8 h-8 text-textGray" />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldFocusAfterRender={false}
        className="bg-secondary dark:bg-secondaryDark absolute top-[25%] left-[50%] transform translate-x-[-50%] w-[80%] max-w-[500px] p-0 rounded-md"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h1 className="headerGray p-4">
          All Boards ({useReadBoardSate().boards.length})
        </h1>
        {useReadBoardSate().boards.map((board, i) => (
          <div
            key={i}
            className={
              selectedBoard === board.name ? "tabActive" : "tabInactive"
            }
            onClick={() => {
              dispatch(setActiveBoardName(board.name));
              setSelectedBoard(board.name);
            }}
          >
            <LuClipboardList
              className={
                selectedBoard === board.name
                  ? "w-5 h-5 mr-2 text-white"
                  : "w-5 h-5 mr-2 text-textGray "
              }
            />
            <p
              className={
                selectedBoard === board.name ? "text-white" : "textGray"
              }
            >
              {board.name}
            </p>
          </div>
        ))}
        <div className="flex items-center pl-4 mt-4 pb-4">
          <LuClipboardList className="w-5 h-5 mr-2 text-action" />
          <p
            className="text-action"
            onClick={() => {
              setIsOpen(false);

              dispatch(toggleShowNewBoard());
            }}
          >
            + Create New Board
          </p>
        </div>
        <ThemeButton />
      </Modal>
    </>
  );
};

export default Navbar;
