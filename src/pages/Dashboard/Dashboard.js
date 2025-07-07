import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import "./Dashboard.css";

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  const [recentActivity, setRecentActivity] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [expiringTasks, setExpiringTasks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/tasks/dashboard/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecentActivity(res.data?.recent_activity || []);
      setTodayTasks(res.data?.today_tasks || []);
      setExpiringTasks(res.data?.expiring_tasks || []);
    } catch (err) {
      console.error("Dashboard data error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="page-background">
      <div className={`dashboard-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <h1>Dashboard Overview</h1>

        <div className="stats">
          <div className="card">
            <h2>Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <ul className="list">
                {recentActivity.map((task, index) => (
                  <li key={index}>
                    <strong>{task.title}</strong> - {task.status} - {new Date(task.created_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent activity found.</p>
            )}
          </div>

          <div className="card">
            <h2>Today's Tasks</h2>
            {todayTasks.length > 0 ? (
              <ul className="list">
                {todayTasks.map((task, index) => (
                  <li key={index}>
                    <strong>{task.title}</strong> - {task.description} ({task.status})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks assigned for today.</p>
            )}
          </div>

          <div className="card">
            <h2>Expiring Tasks</h2>
            {expiringTasks.length > 0 ? (
              <ul className="list">
                {expiringTasks.map((task, index) => (
                  <li key={index}>
                    <strong>{task.title}</strong> - {task.description} (Due: {task.due_date})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No expiring tasks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
