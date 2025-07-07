// src/components/ThemeToggle.js
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded"
    >
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
