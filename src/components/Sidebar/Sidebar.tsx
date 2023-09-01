import useUpdateStore from "@/app/lib/useUpdateStore";
import ThemeButton from "../ThemeButton/ThemeButton";
import { BiHide } from "react-icons/bi";
import { RxBorderWidth } from "react-icons/rx";
import { switchSidebar } from "@/redux/stores/HideSidebar";
import { BsClipboard2 } from "react-icons/bs";
import SelectedBoardName, {
  updateSelectedBoardName,
} from "@/redux/stores/SelectedBoardName";
import { showModal } from "@/redux/stores/showAddNewBoard";
import Modal from "react-modal";
import { useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { addBoard } from "@/redux/stores/boardStore";

Modal.setAppElement("#root");

const Sidebar = () => {
  const { store, updateData } = useUpdateStore();
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
    updateData(showModal(false));
  };

  const samplePLaceholders = [
    "Done",
    "Doing",
    "Todo",
    "In Progress",
    "Completed",
    "Backlog",
    "In Review",
    "In Testing",
    "In QA",
    "In Development",
    "In Design",
    "In Planning",
    "In Discussion",
    "In Analysis",
  ];

  return (
    <div
      className="hidden md:flex flex-col justify-between bg-secondary
      dark:bg-secondaryDark h-full w-[300px] border-r border-textGray"
    >
      <div>
        <div className="flex items-center space-x-2 p-4">
          <RxBorderWidth className="w-10 h-10 text-action" />
          <h1 className="text-black dark:text-white text-3xl">Task Manager</h1>
        </div>
        <h1 className="textGray mt-10 pl-4">
          ALL BOARDS ({store.boardStore.boards.length})
        </h1>

        {store.boardStore.boards.map((board) => (
          <div
            key={board.boardName}
            className={
              store.selectedBoardName.selectedBoardName === board.boardName
                ? "tabActive"
                : "tabInactive"
            }
            onClick={() => updateData(updateSelectedBoardName(board.boardName))}
          >
            <BsClipboard2 className="w-5 h-5 mr-2" />
            <h1 key={board.boardName}>{board.boardName}</h1>
          </div>
        ))}
        <div className="flex items-center pl-4 mt-4">
          <BsClipboard2 className="w-5 h-5 text-action mr-2" />
          <button
            className="text-action font-bold"
            onClick={() => updateData(showModal(true))}
          >
            + Create New Board
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 p-4">
        <ThemeButton />
        <div
          onClick={() => updateData(switchSidebar(false))}
          className="flex space-x-4 items-center"
        >
          <BiHide className="w-6 h-6 text-textGray" />
          <p className="textGray font-bold">Hide Sidebar</p>
        </div>
      </div>

      {store.showAddNewBoard.showModal && (
        <Modal
          className="absolute w-3/4 top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] transform translate-y-[-50%] translate-x-[-50%]
      bg-secondary dark:bg-secondaryDark p-4 rounded-md"
          style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
          isOpen={store.showAddNewBoard.showModal}
          onRequestClose={() => {
            updateData(showModal(false));
          }}
          shouldFocusAfterRender={false}
        >
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
            <button
              className="btnWhite w-full mt-4 mb-2"
              onClick={addExtraBoard}
            >
              +Add New Column
            </button>
            <button className="btn w-full mb-2 mt-2" onClick={handleSubmit}>
              Create New Board
            </button>
          </>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
