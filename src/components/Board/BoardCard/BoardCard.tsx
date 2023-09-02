"use client";
import useUpdateStore from "@/app/lib/useUpdateStore";
import {
  SubTask,
  Task,
  marksSelectedSubTaskAsCompleted,
  updateBoard,
} from "@/redux/stores/boardStore";
import { FC, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";

interface Props {
  task: Task;
}

Modal.setAppElement("#root");

const BoardCard: FC<Props> = (props) => {
  const { store, updateData } = useUpdateStore();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [subTasks, setSubTasks] = useState<SubTask[]>(props.task.subTasks);
  const selectedBoard = store.boardStore.boards.find(
    (board) => board.boardName === store.selectedBoardName.selectedBoardName
  );



  return (
    <>
      <div
        className="bg-secondary dark:bg-secondaryDark p-4 rounded-xl shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <h1 className="header">{props.task.taskName}</h1>
        <p className="textGray">
          {props.task.subTasks.filter((subTask) => subTask.isCompleted).length}{" "}
          of {props.task.subTasks.length} tasks
        </p>
      </div>
      <Modal
        className="absolute w-3/4 top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] transform translate-y-[-50%] translate-x-[-50%]
          bg-secondary dark:bg-secondaryDark p-4 rounded-md"
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        shouldFocusAfterRender={false}
      >
        <div className="flex items-center mb-4 justify-between">
          <h1 className="header overflow-hidden">{props.task.taskName}</h1>
          <BsThreeDotsVertical className="text-2xl text-textGray" />
        </div>

        <p className="textGray mb-4">{props.task.taskDescription}</p>

        <p className="textGray">
          Subtasks ({subTasks.filter((sub) => sub.isCompleted).length} of{" "}
          {subTasks.length})
        </p>
        {subTasks.map((subTask, i) => (
          <div
            key={i}
            className="flex items-center p-4 my-2 bg-primary dark:bg-primaryDark rounded-md"
            onClick={() => {
              const newSubTasks = [...subTasks];
              newSubTasks[i].isCompleted = !newSubTasks[i].isCompleted;


            }}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={subTask.isCompleted}
              onChange={() => {}}
            />
            <p className={subTask.isCompleted ? "text line-through" : "text"}>
              {subTask.subTaskName}
            </p>
          </div>
        ))}
        <p className="textGray">Current Status</p>
        <select className="input w-full">
          {selectedBoard?.boardColumns.map((col, i) => (
            <option key={i}>{col.columnName}</option>
          ))}
        </select>

        {/* <button className="btn w-full mt-4" onClick={handleUpdate}>
          Update
        </button> */}
      </Modal>
    </>
  );
};

export default BoardCard;
