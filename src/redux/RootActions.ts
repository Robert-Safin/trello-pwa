import { switchSidebar } from "./stores/HideSidebar"
import { updateSelectedBoardName } from "./stores/SelectedBoardName"


export type RootAction =
  | ReturnType<typeof switchSidebar>
  | ReturnType<typeof updateSelectedBoardName>;
