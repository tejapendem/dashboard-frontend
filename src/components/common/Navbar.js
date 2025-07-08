// // src/components/common/Navbar.js
// import React, { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
// import "./Navbar.css";


// const Navbar = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <header className={`navbar ${theme}`}>
//       <div className="navbar-left">
//         <h1 className="navbar-title">VEXA</h1>
//       </div>
//       <div className="navbar-right">
//         <button className="theme-toggle" onClick={toggleTheme}>
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
// import "./Navbar.css";
// import GradientText from "./GradientText"; // Make sure path is correct

// const Navbar = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <header className={`navbar ${theme}`}>
//       <div className="navbar-left">
//         <GradientText
//           colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
//           animationSpeed={5}
//           showBorder={false}
//           className="custom-class"
//         >
//           Hello !{}
//         </GradientText>
//       </div>
//       <div className="navbar-right">
//         <button className="theme-toggle" onClick={toggleTheme}>
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";
import GradientText from "./GradientText";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("...");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token"); // Use 'token' for consistency
      if (!token) {
        setUsername("Guest");
        return;
      }

      try {
        // const response = await fetch("http://127.0.0.1:8000/api/username/", {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/username/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await response.json();
        if (response.ok && data.username) {
          setUsername(data.username);
        } else {
          setUsername("Guest");
        }
      } catch (error) {
        setUsername("Guest");
      }
    };

    fetchUsername();
  }, []);

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar-left">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={5}
          showBorder={false}
          className="custom-class"
        >
          {`Hello ${username}!`}
        </GradientText>
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
