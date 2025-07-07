// import React, { useEffect, useState, useCallback, useContext } from "react";
// import axios from "axios";
// import { ThemeContext } from "../../context/ThemeContext";
// import { Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Team.css";

// function Team() {
//   const { theme } = useContext(ThemeContext);
//   const [teamCount, setTeamCount] = useState(0);
//   const [teams, setTeams] = useState([]);
//   const [newTeam, setNewTeam] = useState({ name: "", members: "" });
//   const [showModal, setShowModal] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchTeamCount = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/count/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeamCount(res.data?.team_count || 0);
//     } catch (error) {
//       console.error("Failed to fetch team count:", error);
//     }
//   }, [token]);

//   const fetchTeamList = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/all/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeams(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch team list:", error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTeamCount();
//     fetchTeamList();
//   }, [fetchTeamCount, fetchTeamList]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTeam((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTeamCreate = async (e) => {
//     e.preventDefault();
//     const payload = {
//       name: newTeam.name,
//       members: newTeam.members.split(",").map((id) => parseInt(id.trim())),
//     };

//     try {
//       await axios.post("http://127.0.0.1:8000/api/tasks/teams/create/", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Team created successfully!");
//       setNewTeam({ name: "", members: "" });
//       setShowModal(false);
//       fetchTeamCount();
//       fetchTeamList();
//     } catch (error) {
//       alert("Failed to create team.");
//       console.error(error);
//     }
//   };

//   return (
//       <div className={`page-background ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
//       <div className="team-container">
//         {/* Page Header */}
//         <div className="page-header">
//           <h2>Teams Overview</h2>
//           <button className="floating-plus" onClick={() => setShowModal(true)}>+</button>
//         </div>

//         <div className="team-content-box">
//           {/* Total Teams */}
//           <div className="team-card">
//             <h3>Total Teams</h3>
//             <p>{teamCount}</p>
//           </div>

//           {/* Team List */}
//           <div className="team-list-box">
//             <h3>Team List</h3>
//             {teams.length ? (
//               <ul>
//                 {teams.map((team, i) => (
//                   <li key={i}><strong>{team.name}</strong> – Created by {team.user}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No teams found.</p>
//             )}
//           </div>
//         </div>
//       </div>


//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Team</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleTeamCreate}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Team Name"
//               value={newTeam.name}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="text"
//               name="members"
//               placeholder="Member IDs (comma-separated)"
//               value={newTeam.members}
//               onChange={handleInputChange}
//               required
//             />
//             <button type="submit" className="submit-btn">Create Team</button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Team;



// import React, { useEffect, useState, useCallback, useContext } from "react";
// import axios from "axios";
// import { ThemeContext } from "../../context/ThemeContext";
// import { Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Team.css";

// function Team() {
//   const { theme } = useContext(ThemeContext);
//   const [teamCount, setTeamCount] = useState(0);
//   const [teams, setTeams] = useState([]);
//   const [newTeam, setNewTeam] = useState({ name: "", members: "" });
//   const [showModal, setShowModal] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchTeamCount = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/count/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeamCount(res.data?.team_count || 0);
//     } catch (error) {
//       console.error("Failed to fetch team count:", error);
//     }
//   }, [token]);

//   const fetchTeamList = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/all/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeams(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch team list:", error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTeamCount();
//     fetchTeamList();
//   }, [fetchTeamCount, fetchTeamList]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTeam((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTeamCreate = async (e) => {
//     e.preventDefault();
//     const payload = {
//       name: newTeam.name,
//       members: newTeam.members.split(",").map((id) => parseInt(id.trim())),
//     };

//     try {
//       await axios.post("http://127.0.0.1:8000/api/tasks/teams/create/", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Team created successfully!");
//       setNewTeam({ name: "", members: "" });
//       setShowModal(false);
//       fetchTeamCount();
//       fetchTeamList();
//     } catch (error) {
//       alert("Failed to create team.");
//       console.error(error);
//     }
//   };

//   const handleTeamDelete = async (taskId, teamId) => {
//     if (!window.confirm("Are you sure you want to delete this team?")) return;

//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/delete/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Team deleted successfully.");
//       fetchTeamCount();
//       fetchTeamList();
//     } catch (error) {
//       console.error("Failed to delete team:", error);
//       alert("Could not delete the team.");
//     }
//   };

//   return (
//     <div className={`page-background ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
//       <div className="team-container">
//         {/* Page Header */}
//         <div className="page-header">
//           <h2>Teams Overview</h2>
//           <button className="floating-plus" onClick={() => setShowModal(true)}>+</button>
//         </div>

//         <div className="team-content-box">
//           {/* Total Teams */}
//           <div className="team-card">
//             <h3>Total Teams</h3>
//             <p>{teamCount}</p>
//           </div>

//           {/* Team List */}
//           <div className="team-list-box">
//             <h3>Team List</h3>
//             {teams.length ? (
//               <ul>
//                 {teams.map((team) => (
//                   <li key={team.id} className="team-item">
//                     <div className="team-info">
//                       <strong>{team.name}</strong> – Created by {team.user}
//                     </div>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleTeamDelete(team.id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No teams found.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Team</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleTeamCreate}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Team Name"
//               value={newTeam.name}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="text"
//               name="members"
//               placeholder="Member IDs (comma-separated)"
//               value={newTeam.members}
//               onChange={handleInputChange}
//               required
//             />
//             <button type="submit" className="submit-btn">Create Team</button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Team;






// src/pages/Team.js

// import React, { useEffect, useState, useContext, useCallback } from "react";
// import axios from "axios";
// import { ThemeContext } from "../../context/ThemeContext";
// import { Modal } from "react-bootstrap";
// import Select from "react-select";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Team.css";

// function Team() {
//   const { theme } = useContext(ThemeContext);
//   const [teamCount, setTeamCount] = useState(0);
//   const [teams, setTeams] = useState([]);
//   const [newTeam, setNewTeam] = useState({ name: "", members: [] });
//   const [showModal, setShowModal] = useState(false);
//   const [userOptions, setUserOptions] = useState([]);

//   const token = localStorage.getItem("token");

//   const fetchTeamCount = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/count/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeamCount(res.data.team_count || 0);
//     } catch (error) {
//       console.error("Error fetching team count", error);
//     }
//   }, [token]);

//   const fetchTeamList = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/all/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeams(res.data || []);
//     } catch (error) {
//       console.error("Error fetching teams", error);
//     }
//   }, [token]);

//   const fetchUsernames = useCallback(async () => {
//   try {
//     const res = await axios.get("http://127.0.0.1:8000/api/usernames/", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Fix here 👇
//     const options = res.data.usernames.map((username) => ({
//       label: username,
//       value: username,
//     }));

//     setUserOptions(options);
//   } catch (error) {
//     console.error("❌ Error fetching usernames", error);
//   }
// }, [token]);


//   useEffect(() => {
//     fetchTeamCount();
//     fetchTeamList();
//     fetchUsernames();
//   }, [fetchTeamCount, fetchTeamList, fetchUsernames]);

//   const handleInputChange = (e) => {
//     setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
//   };

//   const handleMemberSelect = (selected) => {
//     const usernames = selected.map((user) => user.value);
//     setNewTeam({ ...newTeam, members: usernames });
//   };

//   const handleTeamCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/api/tasks/teams/create/", newTeam, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Team created successfully!");
//       setNewTeam({ name: "", members: [] });
//       setShowModal(false);
//       fetchTeamCount();
//       fetchTeamList();
//     } catch (error) {
//       console.error("Error creating team", error);
//       alert("Failed to create team.");
//     }
//   };

//   const handleTeamDelete = async (teamId) => {
//     if (!window.confirm("Delete this team?")) return;
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/tasks/${teamId}/delete/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTeamList();
//     } catch (error) {
//       console.error("Error deleting team", error);
//     }
//   };

//   return (
//     <div className={`page-background ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
//       <div className="team-container">
//         <div className="page-header">
//           <h2>Teams Overview</h2>
//           <button className="floating-plus" onClick={() => setShowModal(true)}>+</button>
//         </div>

//         <div className="team-content-box">
//           <div className="team-card">
//             <h3>Total Teams</h3>
//             <p>{teamCount}</p>
//           </div>

//           <div className="team-list-box">
//             <h3>Team List</h3>
//             {teams.length ? (
//               <ul>
//                 {teams.map((team) => (
//                   <li key={team.id} className="team-item">
//                     <div className="team-info">
//                       <strong>{team.name}</strong> — created by {team.user}
//                     </div>
//                     <button className="delete-btn" onClick={() => handleTeamDelete(team.id)}>
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No teams yet.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Team</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleTeamCreate}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Team Name"
//               value={newTeam.name}
//               onChange={handleInputChange}
//               required
//               className="form-control mb-3"
//             />
//             <Select
//               isMulti
//               options={userOptions}
//               onChange={handleMemberSelect}
//               placeholder="Select members..."
//               value={userOptions.filter(opt => newTeam.members.includes(opt.value))}
//             />
//             <button type="submit" className="submit-btn mt-3">Create Team</button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Team;



import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Team.css";

function Team() {
  const { theme } = useContext(ThemeContext);
  const [teams, setTeams] = useState([]);
  const [teamCount, setTeamCount] = useState(0);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", members: [] });
  const [userOptions, setUserOptions] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTeamCount = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/count/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamCount(res.data.team_count || 0);
    } catch (error) {
      console.error("Error fetching team count", error);
    }
  }, [token]);

  const fetchTeamList = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks/teams/all/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(res.data || []);
      setTeamCount(res.data.length || 0);
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  }, [token]);

  const fetchUsernames = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/usernames/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const options = res.data.usernames.map(username => ({
        label: username,
        value: username,
      }));
      setUserOptions(options);
    } catch (error) {
      console.error("Error fetching usernames", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTeamCount();
    fetchTeamList();
    fetchUsernames();
  }, [fetchTeamCount, fetchTeamList, fetchUsernames]);

  const handleShowTeamMembers = (team) => {
    setSelectedTeamName(team.name);
    setSelectedTeamMembers(team.member_usernames || []);
    setShowMembersModal(true);
  };

  const handleInputChange = (e) => {
    setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
  };

  const handleMemberSelect = (selected) => {
    const usernames = selected.map(option => option.value);
    setNewTeam({ ...newTeam, members: usernames });
  };

  const handleTeamCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/tasks/teams/create/", newTeam, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Team created successfully!");
      setNewTeam({ name: "", members: [] });
      setShowCreateModal(false);
      fetchTeamList();
      fetchTeamCount();
    } catch (error) {
      console.error("Error creating team", error);
      alert("Failed to create team.");
    }
  };

  const handleTeamDelete = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${teamId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeamList(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting team", error);
      alert("Failed to delete team.");
    }
  };

  return (
    <div className={`page-background ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <div className="team-container">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h2>Teams Overview</h2>
          <button className="floating-plus" onClick={() => setShowCreateModal(true)}>+</button>
        </div>

        <div className="team-content-box">
          <div className="team-card">
            <h3>Total Teams</h3>
            <p>{teamCount}</p>
          </div>

          <div className="team-list-box">
            <h3>Team List</h3>
            {teams.length ? (
              <ul>
                {teams.map((team) => (
                  <li key={team.id} className="team-item d-flex justify-content-between align-items-center">
                    <div className="team-info">
                      <strong
                        onClick={() => handleShowTeamMembers(team)}
                        style={{ cursor: "pointer", color: "#007bff" }}
                      >
                        {team.name}
                      </strong>{" "}
                      — created by {team.created_by}
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleTeamDelete(team.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No teams available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Create Team Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleTeamCreate}>
            <input
              type="text"
              name="name"
              placeholder="Team Name"
              value={newTeam.name}
              onChange={handleInputChange}
              required
              className="form-control mb-3"
            />
            <Select
              isMulti
              options={userOptions}
              onChange={handleMemberSelect}
              placeholder="Select members..."
              value={userOptions.filter(opt => newTeam.members.includes(opt.value))}
            />
            <button type="submit" className="btn btn-primary mt-3 w-100">
              Create Team
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Team Members Modal */}
      <Modal show={showMembersModal} onHide={() => setShowMembersModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTeamName} - Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeamMembers.length > 0 ? (
            <ul className="list-group">
              {selectedTeamMembers.map((username, index) => (
                <li key={index} className="list-group-item">
                  {username}
                </li>
              ))}
            </ul>
          ) : (
            <p>No members found in this team.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Team;
