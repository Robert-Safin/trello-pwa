import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { BoardState } from "../slices/boardSlice"
import { activeBoardState } from "../slices/activeBoardSlice"
import { ShowNewBoardState } from "../slices/showNearBoard"
import { HideSidebarState } from "../slices/hideSidebarSlice"


export const useReadBoardSate = () => {
  const slice = useSelector<RootState>(state => state.boardSlice)
  return slice as BoardState
}


export const useReadShowNewBoard = () => {
  const slice = useSelector<RootState>(state => state.showNewBoardSlice)
  return slice as ShowNewBoardState
}


export const useReadActiveBoardState = () => {
  const slice = useSelector<RootState>(state => state.activeBoardSlice)
  return slice as activeBoardState
}


export const useReadHideSidebarState = () => {
  const slice = useSelector<RootState>(state => state.hideSidebarSlice)
  return slice as HideSidebarState
}
