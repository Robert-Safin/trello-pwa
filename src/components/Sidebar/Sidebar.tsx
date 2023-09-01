import useUpdateStore from "@/app/lib/useUpdateStore";
import ThemeButton from "../ThemeButton/ThemeButton";
import { BiHide } from "react-icons/bi";
import { RxBorderWidth } from "react-icons/rx";
import { switchSidebar } from "@/redux/stores/HideSidebar";
import { BsClipboard2 } from "react-icons/bs";
import SelectedBoardName, {
  updateSelectedBoardName,
} from "@/redux/stores/SelectedBoardName";
import { showModal } from "@/redux/stores/showAddNewBoard";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Sidebar = () => {
  const { store, updateData } = useUpdateStore();

  return (
    <div
      className="hidden md:flex flex-col justify-between bg-secondary
      dark:bg-secondaryDark h-full w-[300px] border-r border-textGray"
    >
      <div>
        <div className="flex items-center space-x-2 p-4">
          <RxBorderWidth className="w-10 h-10 text-action" />
          <h1 className="text-black dark:text-white text-3xl">Task Manager</h1>
        </div>
        <h1 className="textGray mt-10 pl-4">
          ALL BOARDS ({store.boardStore.boards.length})
        </h1>

        {store.boardStore.boards.map((board) => (
          <div
            key={board.boardName}
            className={
              store.selectedBoardName.selectedBoardName === board.boardName
                ? "tabActive"
                : "tabInactive"
            }
            onClick={() => updateData(updateSelectedBoardName(board.boardName))}
          >
            <BsClipboard2 className="w-5 h-5 mr-2" />
            <h1 key={board.boardName}>{board.boardName}</h1>
          </div>
        ))}
        <div className="flex items-center pl-4">
          <BsClipboard2 className="w-5 h-5 text-action mr-2" />
          <button className="text-action font-bold">+ Create New Board</button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 p-4">
        <ThemeButton />
        <div
          onClick={() => updateData(switchSidebar(false))}
          className="flex space-x-4 items-center"
        >
          <BiHide className="w-6 h-6 text-textGray" />
          <p className="textGray font-bold">Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
