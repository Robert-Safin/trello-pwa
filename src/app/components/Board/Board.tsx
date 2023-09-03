"use client";

import { useReadActiveBoardState, useReadBoardSate } from "@/redux/hooks/hooks";

const Board = () => {
  const activeBoard = useReadActiveBoardState().activeBoardName;
  const activeBoardState = useReadBoardSate().boards.find(
    (board) => board.name === activeBoard
  );

  return (
    <>
      {activeBoard !== null && (
        <div className=" flex overflow-x-auto  h-[calc(100vh-70px)] p-8">
          {activeBoardState?.columns.map((col, i) => (
            <div key={i} className="min-w-[400px] ">
              <h1 className="headerGray mb-4 uppercase">
                {col.name} ({col.tasks.length})
              </h1>
              <div>
                {col.tasks.map((task, i) => (
                  <div key={i}>
                    <h1>{task.name}</h1>
                    <p>
                      {task.subTasks.filter((task) => task.isCompleted).length}{" "}
                      of{" "}
                      {task.subTasks.filter((task) => !task.isCompleted).length}{" "}
                      subtasks
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Board;
