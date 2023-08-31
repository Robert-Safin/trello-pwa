import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  return (
    <div
      className="flex justify-between items-center bg-secondary dark:bg-secondaryDark
     w-full h-24 pb-4  border-b border-textGray pl-4"
    >
      <h1 className="text-2xl text-black dark:text-white">[board name]</h1>
      <div className="flex items-center">
        <button className="btn">+ Add New Task</button>
        <BsThreeDotsVertical className="text-3xl text-textGray mx-2" />
      </div>
    </div>
  );
};

export default Navbar;
