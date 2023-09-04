"use client";

import { useReadActiveBoardState, useReadBoardSate } from "@/redux/hooks/hooks";
import {
  Column,
  Task,
  moveTask,
  toggleSubTask,
} from "@/redux/slices/boardSlice";
import { use, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useReadActiveBoardState().activeBoardName;
  const activeBoardState = useReadBoardSate().boards.find(
    (board) => board.name === activeBoard
  );
  const [activeBoardStateStore, setActiveBoardStateStore] =
    useState(activeBoardState);

  useEffect(() => {
    setActiveBoardStateStore(activeBoardState);
  }, [activeBoardState]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const selectedTaskStore = useReadBoardSate()
    .boards.find((board) => board.name === activeBoard)
    ?.columns.find((col) => col.tasks.includes(selectedTask!))
    ?.tasks.find((task) => task.name === selectedTask?.name);

  const [selectedTaskStoreState, setSelectedTaskStoreState] =
    useState(selectedTaskStore);

  useEffect(() => {
    setSelectedTaskStoreState(selectedTaskStore);
  }, [selectedTaskStore]);

  return (
    <>
      {activeBoard !== null && (
        <div className="flex overflow-x-auto h-[calc(100vh-70px)] p-8 space-x-16">
          {activeBoardState?.columns.map((col, i) => (
            <div key={i} className="min-w-[350px]">
              <h1 className="headerGray mb-4 uppercase">
                {col.name} ( {col.tasks.length} )
              </h1>
              <div className="flex flex-col space-y-4">
                {col.tasks.map((task, i) => (
                  <div
                    key={i}
                    className="bg-secondary dark:bg-secondaryDark p-4 rounded-lg shadow-lg"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsOpen(true);
                    }}
                  >
                    <h1 className="text hover:text-action">{task.name}</h1>
                    <p className="textGray">
                      {task.subTasks.filter((task) => task.isCompleted).length}{" "}
                      of {task.subTasks.length} subtasks
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
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
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-black dark:text-white text-2xl ">
              {selectedTaskStoreState?.name}
            </h1>
            <BsThreeDotsVertical className="w-6 h-6 text-textGray" />
          </div>
          <p className="textGray my-4">{selectedTaskStoreState?.description}</p>
          <p className="textGray font-bold">
            {
              selectedTaskStoreState?.subTasks.filter(
                (subTask) => subTask.isCompleted
              ).length
            }{" "}
            of {selectedTaskStoreState?.subTasks.length}
          </p>
          {selectedTaskStoreState?.subTasks.map((subTask, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 my-2 bg-primary dark:bg-primaryDark p-4 rounded-md"
              onClick={() => {
                setIsOpen(false);
                dispatch(
                  toggleSubTask({
                    boardName: activeBoard!,
                    columnName: selectedTaskStoreState!.status.name,
                    taskName: selectedTaskStoreState!.name,
                    objective: subTask.objective,
                  })
                );
              }}
            >
              <input
                type="checkbox"
                checked={subTask.isCompleted}
                onChange={() => {}}
              />
              <p className="text">{subTask.objective}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Board;
