import {
  useReadActiveBoardState,
  useReadBoardSate,
  useReadShowAddTaskModalState,
} from "@/redux/hooks/hooks";
import { Column, SubTask, Task, addTask } from "@/redux/slices/boardSlice";
import { toggleAddTaskModal } from "@/redux/slices/showAddTaskModal";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const modalStore = useReadShowAddTaskModalState().showModal;
  const [modalIsOpen, setModalIsOpen] = useState(modalStore);

  useEffect(() => {
    setModalIsOpen(modalStore);
  }, [modalStore]);

  const activeBoard = useReadActiveBoardState();
  const activeBoardState = useReadBoardSate().boards!.find(
    (board) => board.name === activeBoard.activeBoardName
  );

  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [subsTasks, setSubTasks] = useState<SubTask[]>([]);
  const [status, setStatus] = useState(activeBoardState!.columns[0].name);

  const handleSubmit = () => {
    dispatch(
      addTask({
        boardName: activeBoard!.activeBoardName as string,
        columnName: status,
        task: {
          name: taskName,
          description: taskDescription,
          subTasks: subsTasks,
          status: activeBoardState!.columns.find(
            (col) => col.name === status
          ) as Column,
        },
      })
    );
    dispatch(toggleAddTaskModal());
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(toggleAddTaskModal())}
      shouldFocusAfterRender={false}
      className="bg-secondary dark:bg-secondaryDark absolute top-[25%] left-[50%] transform translate-x-[-50%] w-[80%] max-w-[500px] p-0 rounded-md"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex flex-col p-4">
        <h1 className="text-black dark:text-white text-2xl mb-4">
          Add New Task
        </h1>

        <label className="label">Task Name</label>
        <input
          type="text"
          className="input"
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        <label className="label">Description</label>
        <textarea
          className="input"
          rows={5}
          onChange={(e) => {
            setTaskDescription(e.target.value);
          }}
        />
        {subsTasks.length !== 0 && <label className="label">Subtasks</label>}
        {subsTasks.map((subTask, i) => (
          <div key={i} className="flex items-center">
            <input
              className="input w-full"
              onChange={(e) => {
                const newSubTasks = [...subsTasks];
                newSubTasks[i].objective = e.target.value;
                setSubTasks(newSubTasks);
              }}
            />
            <RxCross2
              className="w-8 h-8 ml-2 text-textGray hover:text-delete"
              onClick={() => {
                const newSubTasks = [...subsTasks];
                newSubTasks.splice(i, 1);
                setSubTasks(newSubTasks);
              }}
            />
          </div>
        ))}
        <button
          className="btnWhite my-4"
          onClick={() => {
            setSubTasks([...subsTasks, { objective: "", isCompleted: false }]);
          }}
        >
          + Add Subtask
        </button>
        <label className="label">Status</label>
        <select
          className="input text-black dark:text-white text-sm"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          {activeBoardState?.columns.map((col, i) => (
            <option key={i}>{col.name}</option>
          ))}
        </select>
        <button className="btn mt-4" onClick={handleSubmit}>
          Create Task
        </button>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
