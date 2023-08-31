import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import ThemeButton from "@/components/ThemeButton/ThemeButton";

const Main = () => {
  return (
    <div className="bg-primary dark:bg-primaryDark w-screen h-screen flex">





      <div>
        <Sidebar />
      </div>

      <div className="w-full">
        <Navbar />
        <h1>main</h1>
      </div>




    </div>
  );
};

export default Main;
