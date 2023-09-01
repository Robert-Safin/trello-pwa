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

Modal.setAppElement("#root");

const Navbar = () => {
  const { store, updateData } = useUpdateStore();
  const [modalIsOpen, setModalIsOpen] = useState(store.showAddNewBoard.showModal);
  const [createNewBoardIsOpen, setCreateNewBoardIsOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardColumns, setBoardColumn] = useState(["", ""]);

  const addExtraBoard = () => {
    setBoardColumn([...boardColumns, ""]);
  };

  const handleSubmit = () => {
    const boardColumnsFiltered = boardColumns.filter((col) => col !== "");

    const constructColumnType = boardColumnsFiltered.map((col) => {
      return {
        columnName: col,
        tasks: [],
      };
    });

    updateData(
      addBoard({
        boardName: boardName,
        boardColumns: constructColumnType,
      })
    );
  };

  const samplePLaceholders = [
    "e.g. Done",
    "e.g. Doing",
    "e.g. Todo",
    "e.g. In Progress",
    "e.g. Completed",
    "e.g. Backlog",
    "e.g. In Review",
    "e.g. In Testing",
    "e.g. In QA",
    "e.g. In Development",
    "e.g. In Design",
    "e.g. In Planning",
    "e.g. In Discussion",
    "e.g. In Analysis",
  ];

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
          <button className="btn hidden md:block">+ Add New Task</button>
          <button className="btn md:hidden">+</button>
          <BsThreeDotsVertical className="text-3xl text-textGray mx-2" />
        </div>
      </div>

      <Modal
        className="absolute w-3/4 top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] transform translate-y-[-50%] translate-x-[-50%]
      bg-secondary dark:bg-secondaryDark p-4 rounded-md"
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          setCreateNewBoardIsOpen(false);
        }}
        shouldFocusAfterRender={false}
      >
        {createNewBoardIsOpen === false && (
          <>
            <h2 className="text-textGray dark:text-white">ALL BOARDS[N]</h2>
            <div className="my-4">
              {store.boardStore.boards.map((board, i) => (
                <div
                  key={board.boardName}
                  className={
                    store.selectedBoardName.selectedBoardName ===
                    board.boardName
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
                  onClick={() => setCreateNewBoardIsOpen(true)}
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
        )}
        {createNewBoardIsOpen === true && (
          <>
            <h1 className="header mb-4">Add New Board</h1>
            <div className="flex flex-col max-h-96 overflow-y-auto">
              <label className="textGray mt-2 dark:text-white">
                Board Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Learn Rust"
                onChange={(e) => setBoardName(e.target.value)}
              />

              <label className="textGray mt-2 dark:text-white">
                Board Columns
              </label>
              {Array.from(boardColumns).map((col, i) => {
                return (
                  <div key={i} className="flex flex-row items-center w-full">
                    <input
                      type="text"
                      className="input w-full"
                      placeholder={samplePLaceholders[i]}
                      onChange={(e) => {
                        const newBoardColumns = [...boardColumns];
                        newBoardColumns[i] = e.target.value;
                        setBoardColumn(newBoardColumns);
                      }}
                    />
                    <RiDeleteBack2Line
                      onClick={() => {
                        const newBoardColumns = [...boardColumns];
                        newBoardColumns.splice(i, 1);
                        setBoardColumn(newBoardColumns);
                      }}
                      className="w-10 h-10 text-textGray ml-4 hover:text-delete"
                    />
                  </div>
                );
              })}
            </div>
            <button className="btnWhite w-full mt-4 mb-2" onClick={addExtraBoard}>
              +Add New Column
            </button>
            <button className="btn w-full mb-2 mt-2" onClick={handleSubmit}>
              Create New Board
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default Navbar;
