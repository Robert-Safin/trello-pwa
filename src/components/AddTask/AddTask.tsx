"use client";
import Modal from "react-modal";
import { RiDeleteBack2Line } from "react-icons/ri";

import useUpdateStore from "@/app/lib/useUpdateStore";
import { useState } from "react";
import {
  AddTaskPayload,
  SubTask,
  Task,
  addTask,
} from "@/redux/stores/boardStore";
Modal.setAppElement("#root");

const AddTask = () => {
  const { store, updateData } = useUpdateStore();
  const selectedBoard = store.boardStore.boards.find(
    (board) => board.boardName === store.selectedBoardName.selectedBoardName
  );
  const SelectedBoardsColumns = selectedBoard?.boardColumns;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [subTasks, setSubTasks] = useState<SubTask[]>([
    { subTaskName: "", subTaskDescription: "", isCompleted: false },
    { subTaskName: "", subTaskDescription: "", isCompleted: false },
  ]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [columnName, setColumnName] = useState("");

  const placeHolderSubTasks = [
    "Clarify details about the upcoming project",
    "Talk to Bob",
    "Call the client",
    "Send the invoice",
    "Send the contract",
    "Send the proposal",
    "Send the quote",
    "Send the estimate",
    "Send the report",
    "Send the presentation",
    "Send the wireframe",
    "Send the mockup",
  ];
  const addExtraTask = () => {
    setSubTasks([
      ...subTasks,
      {
        subTaskName: "",
        subTaskDescription: "",
        isCompleted: false,
      },
    ]);
  };

  const handleSubmit = () => {
    const newTask: Task = {
      taskName,
      taskDescription,
      boardName: store.selectedBoardName.selectedBoardName,
      subTasks,
    };

    const payload: AddTaskPayload = {
      task: newTask,
      boardName: newTask.boardName,
      columnName: columnName,
    };
    updateData(addTask(payload));
    setSubTasks([
      { subTaskName: "", subTaskDescription: "", isCompleted: false },
      { subTaskName: "", subTaskDescription: "", isCompleted: false },
    ]);
    setModalIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="btn hidden md:block absolute top-6 right-10"
      >
        + Add New Task
      </button>
      <button
        onClick={() => setModalIsOpen(true)}
        className="btn md:hidden absolute top-6 right-10"
      >
        +
      </button>
      <Modal
        className="absolute w-3/4 top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] transform translate-y-[-50%] translate-x-[-50%]
      bg-secondary dark:bg-secondaryDark p-4 rounded-md"
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        shouldFocusAfterRender={false}
      >
        <div className="flex flex-col w-full">
          <h2 className="text-text dark:text-white">Add New Task</h2>

          <label className="textGray mt-2 dark:text-white">Task Name</label>
          <input
            type="text"
            className="input"
            placeholder="e.g. Talk to Bob"
            onChange={(e) => setTaskName(e.target.value)}
          />

          <label className="textGray mt-2 dark:text-white">Description</label>
          <textarea
            rows={5}
            className="input"
            placeholder="e.g. Clarify details about the upcoming project"
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <label className="textGray mt-2 dark:text-white">Subtasks</label>
          {Array.from(subTasks).map((subTask, i) => (
            <div key={i} className="flex items-center">
              <input
                type="text"
                placeholder={placeHolderSubTasks[i]}
                value={subTask.subTaskName}
                className="input w-full"
                onChange={(e) => {
                  const newSubTasks = [...subTasks];
                  newSubTasks[i].subTaskName = e.target.value;
                  setSubTasks(newSubTasks);
                }}
              />
              <RiDeleteBack2Line
                onClick={() => {
                  const newSubTasks = [...subTasks];
                  newSubTasks.splice(i, 1);
                  setSubTasks(newSubTasks);
                }}
                className="w-10 h-10 text-textGray ml-4 hover:text-delete"
              />
            </div>
          ))}
          <button className="btnWhite mt-2 mb-4" onClick={addExtraTask}>
            + Add New Subtask
          </button>
          <label className="textGray mt-2 dark:text-white">Status</label>
          <select
            className="input"
            onChange={(e) => setColumnName(e.target.value)}
          >
            {SelectedBoardsColumns?.map((column, i) => (
              <option key={i}>{column.columnName}</option>
            ))}
          </select>
        </div>
        <button className="btn w-full mt-4" onClick={handleSubmit}>
          Create Task
        </button>
      </Modal>
    </>
  );
};

export default AddTask;
