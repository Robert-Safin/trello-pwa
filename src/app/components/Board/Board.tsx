"use client";

import { useReadActiveBoardState, useReadBoardSate } from "@/redux/hooks/hooks";
import { Column, Task, moveTask, toggleSubTask } from "@/redux/slices/boardSlice";
import { useEffect, useState } from "react";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useReadActiveBoardState().activeBoardName;
  const activeBoardState = useReadBoardSate().boards.find(
    (board) => board.name === activeBoard
  );

  console.log(activeBoardState);


  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTask(null);
  };

  const storeSubTasks = useReadBoardSate()
    .boards.find((board) => board.name === activeBoard)
    ?.columns.find((col) => col.name === selectedTask?.status.name)
    ?.tasks.find((task) => task.name === selectedTask?.name)?.subTasks;

  const [subTasks, setSubTasks] = useState(storeSubTasks);

  useEffect(() => {
    if (storeSubTasks) {
      setSubTasks(storeSubTasks);
    }
  }, [storeSubTasks]);

  const selectedTaskStatus = selectedTask?.status.name;

  const [status, setStatus] = useState(selectedTaskStatus);
  useEffect(()=> {
    setStatus(selectedTaskStatus)
  },[selectedTaskStatus])



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
                    onClick={() => openModal(task)}
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
        onRequestClose={closeModal}
        shouldFocusAfterRender={false}
        className="bg-secondary dark:bg-secondaryDark absolute top-[25%] left-[50%] transform translate-x-[-50%] w-[80%] max-w-[500px] p-0 rounded-md"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-black dark:text-white text-2xl">
              {selectedTask?.name}
            </h1>
            <BsThreeDotsVertical className="w-6 h-6 text-textGray" />
          </div>
          <p className="textGray mb-4">{selectedTask?.description}</p>
          <label className="label">
            Subtasks (
            {subTasks && subTasks.filter((task) => task.isCompleted).length} of{" "}
            {subTasks?.length})
          </label>
          {subTasks &&
            subTasks.map((subTask, i) => (
              <div
                key={i}
                className="flex items-center bg-primary dark:bg-primaryDark my-2 p-4 rounded-lg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    toggleSubTask({
                      boardName: activeBoard!,
                      columnName: selectedTask!.status.name,
                      taskName: selectedTask!.name,
                      objective: storeSubTasks![i].objective,
                    })
                  );
                }}
              >
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={subTask.isCompleted}
                  onChange={() => {}}
                />
                <span
                  className="w-4 h-4 mr-2
                border border-textGray rounded
                peer-checked:bg-action
                peer-checked:border"
                ></span>
                <p className="text peer-checked:line-through decoration-action decoration-2 w-full line-clamp-1">
                  {subTask.objective}
                </p>
              </div>
            ))}
          <label className="label">Status</label>
          <select
            className="input text-black dark:text-white text-sm"
            defaultValue={status}
            onChange={(e) => {
              // setStatus(e.target.value);
              // dispatch(moveTask({
              //   boardName: activeBoard!,
              //   fromColumn: selectedTask!.status.name,
              //   toColumn: e.target.value,
              //   taskName: selectedTask!.name,
              // }))
            }}
          >
            {activeBoardState?.columns.map((col, i) => (
              <option key={i}>{col.name}</option>
            ))}
          </select>
        </div>
      </Modal>
    </>
  );
};

export default Board;
