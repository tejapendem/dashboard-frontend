// src/App.js
// import React from "react";
import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

import AuthPage from "./pages/Auth/AuthPage";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Team from "./pages/Team/Team";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ProjectList from "./pages/Tasks/ProjectList";




const AppLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex min-h-screen ${theme}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1 overflow-y-auto pt-[64px] p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

// import Footer from "./components/common/Footer"; // ✅ Add this at the top


// const AppLayout = ({ children }) => {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div className={`d-flex min-vh-100 ${theme}`}>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="d-flex flex-column flex-grow-1 bg-light dark:bg-dark text-black dark:text-white">
//         <Navbar />

//         {/* Main content with footer pushed to bottom */}
//         <div className="d-flex flex-column flex-grow-1">
//           <main className="flex-grow-1 p-4 overflow-auto">{children}</main>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<PrivateRoute><AppLayout><Home /></AppLayout></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><AppLayout><Dashboard /></AppLayout></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><AppLayout><Projects /></AppLayout></PrivateRoute>} />
            <Route path="/project-list" element={<PrivateRoute><AppLayout><ProjectList /></AppLayout></PrivateRoute>} />
            <Route path="/team" element={<PrivateRoute><AppLayout><Team /></AppLayout></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><AppLayout><Profile /></AppLayout></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><AppLayout><Settings /></AppLayout></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );

}

export default App;
