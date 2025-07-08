// src/components/TaskForm.js
import React, { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

const TaskForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ title: "", description: "", tags: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.tags) {
      toast.warn("All fields are required");
      return;
    }

    try {
      // await axios.post("http://127.0.0.1:8000/api/tasks/create/", form);
      await axios.post("tasks/create/", form);
      toast.success("Task created!");
      setForm({ title: "", description: "", tags: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
