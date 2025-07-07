import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Sidebar.css";
// import ShinyText from './ShinyText';
import SplitText from "./SplitText";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
  return (
    <div className={`sidebar ${theme}`}>
      <div className="sidebar-header">
        {/* <ShinyText text="Portal" disabled={false} speed={3} className='custom-class' /> */}
        <SplitText
          text="Portal"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/home" activeclassname="active">Home</NavLink>
        <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/projects" activeclassname="active">Projects</NavLink>
        <NavLink to="/project-list" activeclassname="active">Tasks</NavLink>
        <NavLink to="/team" activeclassname="active">Team</NavLink>
        <NavLink to="/settings" activeclassname="active">Settings</NavLink>
        <NavLink to="/logout" activeclassname="active">Logout</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
