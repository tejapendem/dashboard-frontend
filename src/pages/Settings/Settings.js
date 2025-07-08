// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { ThemeContext } from "../../context/ThemeContext";
// import "./Settings.css";

// function Settings() {
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const [profile, setProfile] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/profile/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   return (
//     <div className={`page-background ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
//       <div className="settings-container">
//         <h2 className="settings-header">Settings</h2>

//         <div className="settings-content-box">
//           <div className="settings-card">
//             <h3>Profile</h3>
//             {profile ? (
//               <>
//                 <p><strong>ID:</strong> {profile.id}</p>
//                 <p><strong>Username:</strong> {profile.username}</p>
//                 <p><strong>Email:</strong> {profile.email}</p>
//               </>
//             ) : (
//               <p>Loading profile...</p>
//             )}
//           </div>

//           <div className="settings-card">
//             <h3>Theme</h3>
//             <p>Current: <strong>{theme === "light" ? "Light" : "Dark"}</strong></p>
//             <button className="submit-btn" onClick={toggleTheme}>
//               Switch to {theme === "light" ? "Dark" : "Light"} Mode
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;


import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios"; // ✅ use your configured axios instance
import { ThemeContext } from "../../context/ThemeContext";
import "./Settings.css";

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("profile/"); // ✅ relative path
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className={`page-background ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <div className="settings-container">
        <h2 className="settings-header">Settings</h2>

        <div className="settings-content-box">
          <div className="settings-card">
            <h3>Profile</h3>
            {profile ? (
              <>
                <p><strong>ID:</strong> {profile.id}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>

          <div className="settings-card">
            <h3>Theme</h3>
            <p>Current: <strong>{theme === "light" ? "Light" : "Dark"}</strong></p>
            <button className="submit-btn" onClick={toggleTheme}>
              Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
