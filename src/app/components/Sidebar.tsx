"use client";
import React from "react";

type Props = {
  active: "board";
  onSelect: (s: "board" ) => void;
};

export default function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r hidden md:block">
      <div className="p-6">
        <h2 className="text-lg font-bold">Team Manangement</h2>
      </div>

      <nav className="px-4">
        <button
          onClick={() => onSelect("board")}
          className={`w-full text-left px-3 py-2 rounded-md ${
            active === "board" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Board View
        </button>
      </nav>
    </aside>
  );
}
