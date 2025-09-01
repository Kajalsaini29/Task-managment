"use client";

import React, { useState } from "react";
import { Task } from "../types";

type Props = {
  initial?: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
};

export default function TaskForm({ initial = null, onSave, onClose }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [status, setStatus] = useState<Task["status"]>(initial?.status || "todo");

  const handleSubmit = () => {
    if (!title) return;
    onSave({
      id: initial?.id || crypto.randomUUID(),
      title,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{initial ? "Edit Task" : "Add Task"}</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full border px-3 py-2 rounded mb-4"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
