import { switchSidebar } from "./stores/HideSidebar"
import { resetToDefault, updateSelectedBoardName } from "./stores/SelectedBoardName"
import { addBoard, deleteBoard, updateBoard } from "./stores/boardStore";
import { modalIsOpen } from "./stores/editBoard";
import { showModal } from "./stores/showAddNewBoard";



export type RootAction =
  | ReturnType<typeof switchSidebar>
  | ReturnType<typeof updateSelectedBoardName>
  | ReturnType<typeof addBoard>
  | ReturnType<typeof showModal>
  | ReturnType<typeof modalIsOpen>
  | ReturnType<typeof updateBoard>
  | ReturnType<typeof deleteBoard>
  | ReturnType<typeof resetToDefault>
