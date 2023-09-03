import {
  useReadActiveBoardState,
  useReadBoardSate,
  useReadShowEditBoardState,
} from "@/redux/hooks/hooks";
import {
  Column,
  addBoard,
  addColumn,
  deleteBoard,
  deleteColumn,
} from "@/redux/slices/boardSlice";
import { toggleEditBoardModal } from "@/redux/slices/showEditBoardSlice";
import { use, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { renameBoard, renameColumn } from "@/redux/slices/boardSlice";
import { setActiveBoardName } from "@/redux/slices/activeBoardSlice";

Modal.setAppElement("#root");

const EditBoardModal = () => {
  const dispatch = useDispatch();
  const { showModal } = useReadShowEditBoardState();
  const [modalIsOpen, setIsOpen] = useState(showModal);
  const { activeBoardName } = useReadActiveBoardState();
  const oldBoardName = activeBoardName;
  const { boards } = useReadBoardSate();
  const activeBoardState = boards.find(
    (board) => board.name === activeBoardName
  );

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  const [columns, setColumns] = useState<Column[]>([]);
  const [boardName, setBoardName] = useState<string>("");

  useEffect(() => {
    if (activeBoardState) {
      setColumns([...activeBoardState.columns]);
      setBoardName(activeBoardState.name);
    }
  }, [activeBoardState]);
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

  const handleSaveChanges = () => {
    dispatch(toggleEditBoardModal());

    if (activeBoardName && boardName) {
      dispatch(renameBoard({ oldName: activeBoardName, newName: boardName }));
    }

    if (activeBoardState) {
      const oldColumns = activeBoardState.columns;

      columns.forEach((newCol) => {
        if (!oldColumns.some((oldCol) => oldCol.name === newCol.name)) {
          dispatch(addColumn({ boardName, column: newCol }));
        }
      });

      oldColumns.forEach((oldCol) => {
        if (!columns.some((newCol) => newCol.name === oldCol.name)) {
          dispatch(deleteColumn({ boardName, columnName: oldCol.name }));
        }
      });
    }

    dispatch(setActiveBoardName(boardName));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(toggleEditBoardModal())}
      shouldFocusAfterRender={false}
      className="bg-secondary dark:bg-secondaryDark absolute top-[25%] left-[50%] transform translate-x-[-50%] w-[80%] max-w-[500px] p-0 rounded-md"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex flex-col p-4">
      <h1 className="text-black dark:text-white text-2xl mb-4">Edit Board</h1>
        <label className="label">Board Name</label>
        <input
          type="text"
          className="input"
          defaultValue={oldBoardName!}
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
                setColumns((prevColumns) =>
                  prevColumns.map((col, index) => {
                    if (index !== i) return col;
                    return { ...col, name: e.target.value };
                  })
                );
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
        <button className="btn mt-4" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditBoardModal;
