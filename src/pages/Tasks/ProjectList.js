// import React, { useEffect, useState, useContext, useCallback } from "react";
// import axios from "axios";
// import { ThemeContext } from "../../context/ThemeContext";
// import { FaEdit } from "react-icons/fa";
// import "./ProjectList.css";

// function ProjectList() {
//   const { theme } = useContext(ThemeContext);
//   const token = localStorage.getItem("token");

//   const [allTasks, setAllTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     status: "",
//     due_date: "",
//     tags: "",
//   });

//   // ✅ Define fetchAllTasks using useCallback
//   const fetchAllTasks = useCallback(async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/tasks/all/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAllTasks(res.data);
//     } catch (e) {
//       console.error("Failed to load tasks", e);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchAllTasks();
//   }, [fetchAllTasks]);

//   const openEditModal = (task) => {
//     setEditingTask(task);
//     setFormData({
//       title: task.title || "",
//       description: task.description || "",
//       status: task.status || "",
//       due_date: task.due_date || "",
//       tags: Array.isArray(task.tags) ? task.tags.join(", ") : task.tags || "",
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       const updateData = {
//         ...formData,
//         tags: formData.tags.trim(), // ✅ make sure it's a single string
//       };


//       await axios.patch(
//         `http://127.0.0.1:8000/api/tasks/tasks/${editingTask.id}/update/`,
//         updateData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setEditingTask(null);
//       fetchAllTasks();
//     } catch (err) {
//       console.error("Update failed:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <div className={`page-background ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
//       <div className="all-tasks-container">
//         <h1>All Tasks</h1>
//         {allTasks.length > 0 ? (
//           <ul className="all-tasks-list">
//             {allTasks.map((task) => (
//               <li key={task.id} className="task-card">
//                 <div className="task-header">
//                   <h3>{task.title}</h3>
//                   <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
//                     <span className={`status-badge ${task.status}`}>{task.status}</span>
//                     <FaEdit
//                       className="edit-icon"
//                       onClick={() => openEditModal(task)}
//                       title="Edit Task"
//                       style={{ cursor: "pointer" }}
//                     />
//                   </div>
//                 </div>
//                 <p>{task.description}</p>
//                 <div className="task-meta">
//                   <div className="task-tags">
//                     Tags: {Array.isArray(task.tags) ? task.tags.join(", ") : task.tags || "None"}
//                   </div>
//                   <div className="task-due-date">
//                     Due: {task.due_date || "No due date"}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No tasks found.</p>
//         )}
//       </div>

//       {/* ✅ Transparent Update Modal */}
//       {editingTask && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Edit Task</h2>
//             <input
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Title"
//             />
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Description"
//             />
//             <select name="status" value={formData.status} onChange={handleChange}>
//               <option value="">Select status</option>
//               <option value="working">Working</option>
//               <option value="in_progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//             <input
//               type="date"
//               name="due_date"
//               value={formData.due_date}
//               onChange={handleChange}
//             />
//             <input
//               name="tags"
//               value={formData.tags}
//               onChange={handleChange}
//               placeholder="Tags (comma separated)"
//             />
//             <div className="modal-actions">
//               <button onClick={handleUpdate}>Save Changes</button>
//               <button onClick={() => setEditingTask(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProjectList;




import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "../../api/axios"; // ✅ use your configured axios instance
import { ThemeContext } from "../../context/ThemeContext";
import { FaEdit } from "react-icons/fa";
import "./ProjectList.css";

function ProjectList() {
  const { theme } = useContext(ThemeContext);

  const [allTasks, setAllTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
    tags: "",
  });

  const fetchAllTasks = useCallback(async () => {
    try {
      const res = await axios.get("tasks/all/");
      setAllTasks(res.data);
    } catch (e) {
      console.error("Failed to load tasks", e);
    }
  }, []);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "",
      due_date: task.due_date || "",
      tags: Array.isArray(task.tags) ? task.tags.join(", ") : task.tags || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        ...formData,
        tags: formData.tags.trim(),
      };

      await axios.patch(`tasks/tasks/${editingTask.id}/update/`, updateData);

      setEditingTask(null);
      fetchAllTasks();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={`page-background ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <div className="all-tasks-container">
        <h1>All Tasks</h1>
        {allTasks.length > 0 ? (
          <ul className="all-tasks-list">
            {allTasks.map((task) => (
              <li key={task.id} className="task-card">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span className={`status-badge ${task.status}`}>{task.status}</span>
                    <FaEdit
                      className="edit-icon"
                      onClick={() => openEditModal(task)}
                      title="Edit Task"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <p>{task.description}</p>
                <div className="task-meta">
                  <div className="task-tags">
                    Tags: {Array.isArray(task.tags) ? task.tags.join(", ") : task.tags || "None"}
                  </div>
                  <div className="task-due-date">
                    Due: {task.due_date || "No due date"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>

      {/* ✅ Transparent Update Modal */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="working">Working</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
            />
            <div className="modal-actions">
              <button onClick={handleUpdate}>Save Changes</button>
              <button onClick={() => setEditingTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
