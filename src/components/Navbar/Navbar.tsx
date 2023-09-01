"use client";
import useUpdateStore from "@/app/lib/useUpdateStore";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxBorderWidth } from "react-icons/rx";
import Modal from "react-modal";
import ThemeButton from "../ThemeButton/ThemeButton";
import { BsClipboard2 } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";
import { Column, addBoard } from "@/redux/stores/boardStore";
import SelectedBoardName, {
  updateSelectedBoardName,
} from "@/redux/stores/SelectedBoardName";
import { showModal } from "@/redux/stores/showAddNewBoard";

Modal.setAppElement("#root");

const Navbar = () => {
  const { store, updateData } = useUpdateStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex justify-between items-center bg-secondary dark:bg-secondaryDark
      w-full h-20   border-b border-textGray pl-4"
      >
        <div className="flex items-center">
          <RxBorderWidth className="w-10 h-10 text-action mr-2" />
          <h1 className="text-xl text-black dark:text-white font-bold">
            {store.selectedBoardName.selectedBoardName}
          </h1>
          <RiArrowDropDownLine
            className="md:hidden w-8 h-8 text-action"
            onClick={() => setModalIsOpen(true)}
          />
        </div>
        <div className="flex items-center">
          <button className="btn hidden md:block absolute top-6 right-10">
            + Add New Task
          </button>
          <button className="btn md:hidden absolute top-6 right-10">+</button>
          <BsThreeDotsVertical className="text-3xl text-textGray mx-2 absolute top-7 right-0" />
        </div>
      </div>

      <Modal
        className="absolute w-3/4 top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] transform translate-y-[-50%] translate-x-[-50%]
      bg-secondary dark:bg-secondaryDark p-4 rounded-md"
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          updateData(showModal(false));
        }}
        shouldFocusAfterRender={false}
      >
        <>
          <h2 className="text-textGray dark:text-white">ALL BOARDS[N]</h2>
          <div className="my-4">
            {store.boardStore.boards.map((board, i) => (
              <div
                key={board.boardName}
                className={
                  store.selectedBoardName.selectedBoardName === board.boardName
                    ? "tabActive"
                    : "tabInactive"
                }
                onClick={() =>
                  updateData(updateSelectedBoardName(board.boardName))
                }
              >
                <BsClipboard2 className="w-5 h-5 mr-2" />
                <h1 key={board.boardName}>{board.boardName}</h1>
              </div>
            ))}
            <div className="mb-4">
              <div
                className="flex items-center mt-2"
                onClick={() => updateData(showModal(true))}
              >
                <BsClipboard2 className="w-5 h-5 text-action mr-2 ml-4 " />
                <button className="text-action font-bold">
                  + Create New Board
                </button>
              </div>
            </div>
          </div>
          <ThemeButton />
        </>
      </Modal>
    </>
  );
};

export default Navbar;
