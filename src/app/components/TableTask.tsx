"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types";

type Props = {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
};

export default function SortableTask({ task, onEdit, onDelete }: Props) {
  const { setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{task.title}</h4>
          {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">

            <button
              onClick={() => onEdit(task)}
              className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
              title="Edit"
            >
              ⋮
              
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded-md text-red-600 hover:bg-red-50"
              title="Delete"
            >
              🗑
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
