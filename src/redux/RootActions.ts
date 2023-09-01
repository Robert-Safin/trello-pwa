import { switchSidebar } from "./stores/HideSidebar"
import { updateSelectedBoardName } from "./stores/SelectedBoardName"
import { addBoard } from "./stores/boardStore";
import { showModal } from "./stores/showAddNewBoard";



export type RootAction =
  | ReturnType<typeof switchSidebar>
  | ReturnType<typeof updateSelectedBoardName>
  | ReturnType<typeof addBoard>
  | ReturnType<typeof showModal>
