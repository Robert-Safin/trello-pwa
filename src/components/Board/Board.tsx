"use client";
import useUpdateStore from "@/app/lib/useUpdateStore";
import { Task, updateBoard } from "@/redux/stores/boardStore";
import { modalIsOpen } from "@/redux/stores/editBoard";
import { useEffect, useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import Modal from "react-modal";

Modal.setAppElement("#root");
interface Column {
  columnName: string;
  tasks: Task[]; // replace Task with the type you're using for tasks
}
const Board = () => {
  const { store, updateData } = useUpdateStore();

  const [boardName, setBoardName] = useState<string>("");
  const [boardColumns, setBoardColumn] = useState<Column[]>([]);

  const activeBoard = store.boardStore.boards.find(
    (board) => board.boardName === store.selectedBoardName.selectedBoardName
  );

  useEffect(() => {
    if (activeBoard) {
      setBoardName(activeBoard.boardName);
      setBoardColumn(activeBoard.boardColumns);
    }
  }, [store, activeBoard]);

  if (store.boardStore.boards.length === 0 || !activeBoard) {
    return;
  }
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

  const addExtraBoard = () => {
    setBoardColumn([
      ...boardColumns,
      {
        columnName:
          samplePLaceholders[
            Math.floor(Math.random() * samplePLaceholders.length)
          ],
        tasks: [],
      },
    ]);
  };

  const handleSubmit = () => {
    const newBoard = {
      boardName: boardName,
      boardColumns: boardColumns,
    };

    updateData(updateBoard(newBoard));
    updateData(modalIsOpen(false));
  };

  return (
    <>
      {store.boardStore.boards.length > 0 && activeBoard && (
        <div className="py-4 px-16">
          <div
            className="grid grid-flow-col gap-16"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              overflow: "auto",
              minHeight: "calc(100vh - 110px)",
              maxHeight: "calc(100vh - 110px)",
            }}
          >
            {activeBoard.boardColumns.map((column, i) => (
              <div key={i} className="border-4 w-[250px]">
                <h1 className="headerGray uppercase">{column.columnName}</h1>
              </div>
            ))}
            <div className="bg-secondary dark:bg-secondaryDark border-4 w-[250px] mr-[250px]">
              <div
                className="flex justify-center align-middle items-center h-full"
                onClick={() => {
                  console.log("hi");

                  updateData(modalIsOpen(true));
                }}
              >
                <h1 className="text-3xl text-textGray">+ New Column</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        className="absolute w-3/4 top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] transform translate-y-[-50%] translate-x-[-50%]
          bg-secondary dark:bg-secondaryDark p-4 rounded-md"
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
        isOpen={store.showEditModal.showEditModal}
        onRequestClose={() => {
          updateData(modalIsOpen(false));
        }}
        shouldFocusAfterRender={false}
      >
        <>
          <h1 className="header mb-4">Add New Board</h1>
          <div className="flex flex-col max-h-96 overflow-y-auto">
            <label className="textGray mt-2 dark:text-white">Board Name</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Learn Rust"
              value={boardName}
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
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
                    placeholder={col.columnName}
                    onChange={(e) => {
                      const newBoardColumns = [...boardColumns];
                      newBoardColumns[i] = {
                        columnName: e.target.value,
                        tasks: [],
                      };
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
            Update Board
          </button>
        </>
      </Modal>
    </>
  );
};

export default Board;
