import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import "./Projects.css";

function Projects() {
  const { theme } = useContext(ThemeContext);

  const [working, setWorking] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/projects/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data || {};
      setWorking(data.working || []);
      setInProgress(data.in_progress || []);
      setCompleted(data.completed || []);
    } catch (error) {
      console.error("Error fetching project tasks:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/tasks/${taskId}/update_status/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks(); // refresh UI
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Status update failed.");
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case "working":
        return "red";
      case "in_progress":
        return "orange";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  const handleDeleteTask = async (taskId ,teamId) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try {
    await axios.delete(`http://localhost:8000/api/tasks/tasks/${taskId}/delete/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks(); // refresh task list
  } catch (error) {
    console.error("Failed to delete task:", error);
    alert("Failed to delete task.");
  }
};
const renderTask = (task) => (
  <li key={task.id} className="task-item">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: getStatusDotColor(task.status),
            marginRight: "0.5rem",
          }}
        ></span>
        <strong>{task.title}</strong> – {task.description}
      </div>
      <button
        onClick={() => handleDeleteTask(task.id)}
        className="delete-btn"
        title="Delete Task"
      >
        🗑️
      </button>
    </div>
    <div className="status-select">
      <label>Status:</label>
      <select
        value={task.status}
        onChange={(e) => handleStatusChange(task.id, e.target.value)}
      >
        <option value="working">Working</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </li>
);

  return (
    <div className="page-background">
      <div className={`projects-container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
        <h1>Project Tasks</h1>
        <div className="status-columns">
          <div className="column card">
            <h2>Working</h2>
            {working.length > 0 ? (
              <ul>{working.map(renderTask)}</ul>
            ) : (
              <p>No tasks in Working status.</p>
            )}
          </div>
          <div className="column card">
            <h2>In Progress</h2>
            {inProgress.length > 0 ? (
              <ul>{inProgress.map(renderTask)}</ul>
            ) : (
              <p>No tasks in Progress.</p>
            )}
          </div>
          <div className="column card">
            <h2>Completed</h2>
            {completed.length > 0 ? (
              <ul>{completed.map(renderTask)}</ul>
            ) : (
              <p>No tasks Completed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
