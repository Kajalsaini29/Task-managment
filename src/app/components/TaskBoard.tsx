"use client";

import React, { useMemo, useState } from "react";
import { Task, Status } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SortableTask from "./TableTask";
import TaskForm from "./taskForm";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type Props = { showAddButton?: boolean };

export default function TaskBoard({ showAddButton = true }: Props) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("team_tasks", []);
  const [editing, setEditing] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const columns = useMemo(() => ({
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.status === "done"),
  } as Record<Status, Task[]>), [tasks]);

  const openAdd = () => {
    setEditing(null); setModalOpen(true);
  };

  const handleSave = (task: Task) => {
    setTasks(tasks.some(t => t.id === task.id) ? tasks.map(t => t.id === task.id ? task : t) : [...tasks, task]);
  };

  const handleDelete = (id: string) =>
    setTasks(tasks.filter(t => t.id !== id)
    );
    
  const handleEdit = (t: Task) => {
    setEditing(t); setModalOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const fromCol = tasks.find(t => t.id === active.id)?.status;
    const toCol = tasks.find(t => t.id === over.id)?.status;
    if (!fromCol || !toCol) return;

    if (fromCol === toCol) {
      const column = columns[fromCol];
      const oldIndex = column.findIndex(t => t.id === active.id);
      const newIndex = column.findIndex(t => t.id === over.id);
      if (oldIndex !== newIndex) {
        const newColumn = arrayMove(column, oldIndex, newIndex);
        const newTasks: Task[] = [];
        (["todo", "inprogress", "done"] as Status[]).forEach(key => {
          newTasks.push(...(key === fromCol ? newColumn : columns[key]));
        });
        setTasks(newTasks);
      }
    } else {
      setTasks(tasks.map(t => t.id === active.id ? { ...t, status: toCol } : t));
    }
  };

  return (
    <div className="relative">
      {showAddButton && (
        <div className="fixed right-8 top-8 z-50">
          <button onClick={openAdd} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-black shadow">
            Add Task
          </button>
        </div>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["todo", "inprogress", "done"] as Status[]).map(colKey => (
            <div key={colKey} className="bg-gray-200 rounded-2xl p-4 min-h-[320px] flex flex-col">
              <h3 className="mb-3 text-xl font-bold text-gray-700">
                {colKey === "todo" ? "To Do" : colKey === "inprogress" ? "In Progress" : "Done"}
              </h3>
              <SortableContext items={columns[colKey].map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 flex-1">
                  {columns[colKey].map(task => (
                    <SortableTask key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      {isModalOpen && (
        <TaskForm initial={editing} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

