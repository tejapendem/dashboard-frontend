import React from "react";
import "./TaskCard.css";

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      {task.tags && <small>Tags: {task.tags}</small>}
    </div>
  );
}

export default TaskCard;
