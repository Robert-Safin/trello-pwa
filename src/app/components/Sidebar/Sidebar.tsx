import {
  useReadActiveBoardState,
  useReadBoardSate,
  useReadShowNewBoard,
} from "@/redux/hooks/hooks";
import { useState } from "react";
import { LuClipboardList } from "react-icons/lu";
import { TbBrandRedux } from "react-icons/tb";
import ThemeButton from "../ThemeButton/ThemeButton";
import { BiHide } from "react-icons/bi";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toggleShowNewBoard } from "@/redux/slices/showNearBoard";
import { Column, addBoard, addColumn } from "@/redux/slices/boardSlice";
import { RxCross2 } from "react-icons/rx";
import { setActiveBoardName } from "@/redux/slices/activeBoardSlice";
import { toggleHideSidebar } from "@/redux/slices/hideSidebarSlice";
Modal.setAppElement("#root");

const Sidebar = () => {
  const dispatch = useDispatch();
  const [selectedBoard, setSelectedBoard] = useState<string | null>(
    useReadActiveBoardState().activeBoardName
  );
  const [columns, setColumns] = useState<Column[]>([]);
  const [boardName, setBoardName] = useState<string>("");

  const randomColumnName = [
    "To Do",
    "In Progress",
    "Done",
    "Testing",
    "Deployed",
    "Backlog",
    "Blocked",
    "Review",
    "QA",
    "Design",
    "Development",
    "Research",
  ];

  return (
    <>
      <div className="hidden md:flex flex-col justify-between w-[400px] bg-secondary dark:bg-secondaryDark h-screen border-r">
        <div>
          <div className="flex items-center p-4">
            <TbBrandRedux className="w-10 h-10 text-action mr-2" />
            <h1 className="text-2xl font-bold tracking-widest dark:text-white">
              To DO
            </h1>
          </div>

          <h1 className="textGray pl-4 mt-4">
            ALL BOARDS ({useReadBoardSate().boards.length})
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
                dispatch(toggleShowNewBoard());
              }}
            >
              + Create New Board
            </p>
          </div>
        </div>
        <div>
          <ThemeButton />
          <div className="flex items-center pb-4 pl-4">
            <BiHide className="w-6 h-6 text-textGray mr-2" />
            <p className="text-textGray"onClick={()=> {
              dispatch(toggleHideSidebar())
            }}>Hide Sidebar</p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={useReadShowNewBoard().showModal}
        onRequestClose={() => dispatch(toggleShowNewBoard())}
        shouldFocusAfterRender={false}
        className="bg-secondary dark:bg-secondaryDark absolute top-[25%] left-[50%] transform translate-x-[-50%] w-[80%] max-w-[500px] p-0 rounded-md"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="flex flex-col p-4">
          <h1 className="text-black dark:text-textGray text-2xl mb-4">
            Add New Board
          </h1>

          <label className="label">Board Name</label>
          <input
            type="text"
            className="input"
            onChange={(e) => {
              setBoardName(e.target.value);
            }}
          />
          <label className="label">Board Columns</label>

          {columns.map((col, i) => (
            <div key={i} className="flex items-center">
              <input
                className="input w-full"
                value={col.name}
                onChange={(e) => {
                  const newColumns = [...columns];
                  newColumns[i].name = e.target.value;
                  setColumns(newColumns);
                }}
              />
              <RxCross2
                className="w-8 h-8 ml-2 text-textGray hover:text-delete"
                onClick={() => {
                  const newColumns = [...columns];
                  newColumns.splice(i, 1);
                  setColumns(newColumns);
                }}
              />
            </div>
          ))}

          <button
            className="btnWhite mt-4"
            onClick={() => {
              setColumns([
                ...columns,
                {
                  tasks: [],
                  name: randomColumnName[
                    Math.floor(Math.random() * randomColumnName.length)
                  ],
                },
              ]);
            }}
          >
            + Add New Column
          </button>
          <button
            className="btn mt-4"
            onClick={() => {
              const filteredColumns = columns.filter((col) => col.name !== "");
              const defaultName =
                boardName ||
                `Untitled Board ${Math.floor(Math.random() * 1000)}`;
              dispatch(addBoard({ name: defaultName, columns: [] }));
              for (let column of filteredColumns) {
                dispatch(addColumn({ boardName: defaultName, column }));
              }
              dispatch(toggleShowNewBoard());
            }}
          >
            Create New Board
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
