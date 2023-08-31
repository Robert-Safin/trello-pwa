"use client";

import { useState } from "react";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const ThemeButton = () => {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center justify-center space-x-8 bg-primary dark:bg-primaryDark rounded-md py-2">
      <BsFillSunFill className="w-6 h-6 text-textGray" />
      <button onClick={changeTheme}>i/o</button>

      <BsMoonStarsFill className="w-4 h-4 text-textGray" />
    </div>
  );
};

export default ThemeButton;
