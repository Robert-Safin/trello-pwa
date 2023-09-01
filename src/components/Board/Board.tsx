"use client";
import useUpdateStore from "@/app/lib/useUpdateStore";

const Board = () => {
  const { store, updateData } = useUpdateStore();
  const activeBoard = store.boardStore.boards.filter(
    (board) => board.boardName === store.selectedBoardName.selectedBoardName
  )[0];



  return (
    <>
      {store.boardStore.boards.length > 0 && (
        <div className="py-4 px-16">
          <div
            className="grid grid-flow-col gap-16"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              overflow: "auto",
              minHeight: "calc(100vh - 110px)",
              maxHeight: "calc(100vh - 110px)",
            }}
          >
            {activeBoard.boardColumns.map((column, i) => (
              <div key={i} className="border-4 w-[250px]">
                <h1 className="headerGray uppercase">{column.columnName}</h1>
              </div>
            ))}
            <div className="bg-secondary dark:bg-secondaryDark border-4 w-[250px] mr-[250px]">
              add new col
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
