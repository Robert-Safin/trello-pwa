import ThemeButton from "../ThemeButton/ThemeButton";
import {BiHide} from "react-icons/bi";
import {RxBorderWidth} from "react-icons/rx";
const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col justify-between bg-secondary
      dark:bg-secondaryDark h-full w-[300px] border-r border-textGray p-4">
      <div>
        <div className="flex items-center space-x-2">
        <RxBorderWidth className="w-10 h-10 text-action"/>
          <h1 className="text-black dark:text-white text-3xl">Task Manager</h1>
        </div>
        <h1 className="textGray mt-10">ALL BOARDS [N]</h1>
        <div>
          <h1>[board]</h1>
          <h1>[board]</h1>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <ThemeButton />
        <div className="flex space-x-4 items-center">
          <BiHide className="w-6 h-6 text-textGray" />
          <p className="textGray font-bold">Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
