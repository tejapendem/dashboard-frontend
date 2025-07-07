// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Profile.css";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/profile/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProfile(res.data);
//     } catch (error) {
//       console.error("Failed to load profile:", error);
//     }
//   };

//   if (!profile) {
//     return <div className="profile-container">Loading profile...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h2>User Profile</h2>
//       <div className="profile-card">
//         <p><strong>Username:</strong> {profile.username}</p>
//         <p><strong>Email:</strong> {profile.email}</p>
//         <p><strong>Role:</strong> {profile.role}</p>
//         <p><strong>Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// }

// export default Profile;
