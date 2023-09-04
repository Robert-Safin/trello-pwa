"use client";
import React, { useState, useEffect } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import Switch from "react-switch";

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <div className="rounded-md bg-primary dark:bg-primaryDark flex justify-evenly items-center p-4 m-4 border dark:border-slate-900 shadow-inner">
      <BsMoonStarsFill className="text-textGray w-4 h-4" />
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#7942b1"
        onColor="#7942b1"
        handleDiameter={20}
      />
      <BsFillSunFill className="text-textGray w-5 h-5" />
    </div>
  );
};

export default ThemeButton;
