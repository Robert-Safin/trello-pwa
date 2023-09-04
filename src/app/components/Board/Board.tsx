"use client";

import { useReadActiveBoardState, useReadBoardSate } from "@/redux/hooks/hooks";
import {
  Task,
  deleteTask,
  moveTask,
  toggleSubTask,
  updateTask,
} from "@/redux/slices/boardSlice";
import { MouseEventHandler, use, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"
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

  const [showOptions, setShowOptions] = useState(false);

  const [showEditTask, setShowEditTask] = useState(false);

  const [editState, setEditState] = useState<Task | null>(null);
  useEffect(() => {
    setEditState(selectedTask);
  }, [selectedTask]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastClientX, setLastClientX] = useState(0);
  const [lastClientY, setLastClientY] = useState(0);

  const onMouseDown = (e: any) => {
    setIsDragging(true);
    setLastClientX(e.clientX);
    setLastClientY(e.clientY);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: any) => {
    if (isDragging) {
      const dx = e.clientX - lastClientX;
      const dy = e.clientY - lastClientY;
      setLastClientX(e.clientX);
      setLastClientY(e.clientY);

      containerRef.current!.scrollLeft -= dx;
      containerRef.current!.scrollTop -= dy;
    }
  };

  return (
    <>
      {activeBoard !== null && (


        <div
          className="flex overflow-x-auto h-[calc(100vh-80px)] p-8 space-x-16"
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {activeBoardState?.columns.map((col, i) => (
            <div key={i} className="min-w-[350px]">
              <h1 className="headerGray mb-4 uppercase">
                {col.name} ( {col.tasks.length} )
              </h1>
              <div className="flex flex-col space-y-4">
                {col.tasks.map((task, i) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}


                    key={i}
                    className="bg-secondary dark:bg-secondaryDark p-4 rounded-lg shadow-lg hover:shadow-action"
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
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      )}
      {showEditTask === false && (
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
              <BsThreeDotsVertical
                className="w-6 h-6 text-textGray"
                onClick={() => {
                  setShowOptions(true);
                  setTimeout(() => {
                    setShowOptions(false);
                  }, 3000);
                }}
              />
              {showOptions && (
                <div className="absolute flex flex-col justify-evenly right-4 top-4 w-32 h-24 bg-primary dark:bg-primaryDark rounded-md p-4">
                  <p
                    className="text-textGray mb-1"
                    onClick={() => {
                      setShowEditTask(true);
                    }}
                  >
                    Edit Task
                  </p>
                  <p
                    onClick={() => {
                      setIsOpen(false);
                      dispatch(
                        deleteTask({
                          boardName: activeBoard!,
                          columnName: activeBoardStateStore!.columns.find(
                            (col) => col.tasks.includes(selectedTask!)
                          )!.name,
                          taskName: selectedTaskStoreState!.name,
                        })
                      );
                    }}
                    className="text-delete mb-1"
                  >
                    Delete Task
                  </p>
                </div>
              )}
            </div>
            <p className="textGray my-4">
              {selectedTaskStoreState?.description}
            </p>
            <p className="textGray font-bold">
           Subtasks ({
                selectedTaskStoreState?.subTasks.filter(
                  (subTask) => subTask.isCompleted
                ).length
              }{" "}
              of {selectedTaskStoreState?.subTasks.length})
            </p>
            {selectedTaskStoreState?.subTasks.map((subTask, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 my-2 bg-primary dark:bg-primaryDark p-4 rounded-md"
                onClick={() => {
                  setIsOpen(false);
                  const currentColumnName = activeBoardStateStore!.columns.find(
                    (col) => col.tasks.includes(selectedTask!)
                  )?.name;

                  dispatch(
                    toggleSubTask({
                      boardName: activeBoard!,
                      columnName: currentColumnName!,
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
            <p className="textGray">Current Status</p>
            <select
              className="input text-black dark:text-white text-sm p-3"
              value={
                activeBoardStateStore?.columns.find((col) =>
                  col.tasks.includes(selectedTask!)
                )?.name
              }
              onChange={(e) => {
                setIsOpen(false);
                const currentColumnName = activeBoardStateStore!.columns.find(
                  (col) => col.tasks.includes(selectedTask!)
                )?.name;
                dispatch(
                  moveTask({
                    boardName: activeBoard!,
                    columnName: currentColumnName!,
                    taskName: selectedTaskStoreState!.name,
                    newColumnName: e.target.value,
                  })
                );
              }}
            >
              {activeBoardStateStore?.columns.map((col, i) => (
                <option key={i}>{col.name}</option>
              ))}
            </select>
          </div>
        </Modal>
      )}
      <Modal
        isOpen={showEditTask}
        onRequestClose={() => setShowEditTask(false)}
        shouldFocusAfterRender={false}
        className="bg-secondary dark:bg-secondaryDark absolute top-[25%] left-[50%] transform translate-x-[-50%] w-[80%] max-w-[500px] p-0 rounded-md"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="flex flex-col p-4">
          <h1 className="text-black dark:text-white text-2xl ">Edit Task</h1>
          <label className="label">Title</label>
          <input
            className="input"
            value={editState?.name}
            onChange={(e) => {
              setEditState({ ...editState!, name: e.target.value });
            }}
          />

          <label className="label">Description</label>
          <textarea
            className="input"
            rows={5}
            value={editState?.description}
            onChange={(e) => {
              setEditState({ ...editState!, description: e.target.value });
            }}
          />

          <label className="label">Subtasks</label>
          {editState?.subTasks.map((subTask, i) => (
            <div key={i} className="flex items-center">
              <input
                className="input w-full"
                value={subTask.objective}
                onChange={(e) => {
                  const newSubTasks = editState?.subTasks.map(
                    (subTask, index) => {
                      if (index === i) {
                        return { ...subTask, objective: e.target.value };
                      } else {
                        return subTask;
                      }
                    }
                  );
                  setEditState({ ...editState!, subTasks: newSubTasks! });
                }}
              />
              <RxCross2
                className="w-8 h-8 ml-2 text-textGray hover:text-delete"
                onClick={() => {
                  const newSubTasks = editState?.subTasks.filter(
                    (subTask, index) => index !== i
                  );
                  setEditState({ ...editState!, subTasks: newSubTasks! });
                }}
              />
            </div>
          ))}
          <button
            className="btnWhite mt-8 mb-4"
            onClick={() => {
              setEditState({
                ...editState!,
                subTasks: [
                  ...editState!.subTasks,
                  { objective: "", isCompleted: false },
                ],
              });
            }}
          >
            + Add New Subtask
          </button>
          <button
            className="btn"
            onClick={() => {
              setShowEditTask(false);
              setIsOpen(false);
              dispatch(
                updateTask({
                  boardName: activeBoard!,
                  columnName: activeBoardStateStore!.columns.find((col) =>
                    col.tasks.includes(selectedTask!)
                  )!.name,
                  oldTaskName: selectedTaskStoreState!.name,
                  newTask: editState!,
                })
              );
            }}
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Board;
