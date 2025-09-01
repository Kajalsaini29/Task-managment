"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";

export default function HomePage() {
  const [view, setView] = useState<"board">("board");

  return (
    <main className="min-h-screen bg-gray-50 flex">
      <Sidebar active={view} onSelect={setView} />

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Team Dashboard</h1>
          </div>
          
          {/* Board view */}

          <TaskBoard showAddButton={true} />

        </div>
      </div>
    </main>
  );
}
