import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import "./Home.css";

function Home() {
  const { theme } = useContext(ThemeContext);

  const [metrics, setMetrics] = useState({
    active_users: 0,
    tasks: 0,
    tasks_completed: 0,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    due_date: "",
  });

  const token = localStorage.getItem("token");

  const fetchMetrics = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/metrics/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics(response.data);
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/tasks/create/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task created successfully!");
      setFormData({ title: "", description: "", tags: "", due_date: "" });
      fetchMetrics();
    } catch (error) {
      alert("Error creating task.");
      console.error(error);
    }
  };

  return (
    <div className="page-background">
      <div className={`home-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <h1>Welcome to Workline...</h1>
        <div className="stats">
          <div className="card">
            <h2>Active Users</h2>
            <p>{metrics.active_users}</p>
          </div>
          <div className="card">
            <h2>Tasks</h2>
            <p>{metrics.tasks}</p>
          </div>
          <div className="card">
            <h2>Tasks Completed</h2>
            <p>{metrics.tasks_completed}</p>
          </div>
        </div>

        <h2>Create New Task</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
