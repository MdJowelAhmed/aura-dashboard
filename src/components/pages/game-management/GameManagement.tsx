"use client";

import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Table } from "./GameTable"; // Import the Table component

// Sample game data
const gameData = [
  {
    id: 1,
    image: "/aura-logo.png",
    gameTitle: "Aura Bundle Event",
    description: "An exciting game with Aura bundles.",
    createdOn: "01-02-2025",
    status: "Active",
  },
  {
    id: 2,
    image: "/call-logo.png",
    gameTitle: "Call Bundle Event",
    description: "A thrilling Call bundle event.",
    createdOn: "02-02-2025",
    status: "Active",
  },
  {
    id: 3,
    image: "/premium-logo.png",
    gameTitle: "Premium Bundle Event",
    description: "Premium bundles with exclusive features.",
    createdOn: "03-02-2025",
    status: "Inactive",
  },
];

export function GameManagement() {
  const [statusFilter, setStatusFilter] = useState("Active");
  const [gameFilter, setGameFilter] = useState("Aura Bundle");
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    gameData.reduce((acc, game) => {
      acc[game.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleToggle = (id: number) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = gameData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(gameData.length / itemsPerPage);

  // Header names array for games table
  const headerNames = [
    "SL",
    "Image",
    "Game Title",
    "Description",
    "Created On",
    "Status",
    "Actions",
  ];

  return (
    <div className="w-full mx-auto space-y-6 my-5">
      {/* Header Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <div className="flex gap-3">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 px-6 hover:bg-white/30 transition-all duration-200">
            Create New Game
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        {/* Table */}
        <Table
          bundles={currentGames}
          toggleStates={toggleStates}
          handleToggle={handleToggle}
          headerNames={headerNames} // Pass header names as prop
        />

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => handlePagination(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-white/20 text-white"
              } rounded-lg px-4 py-2 hover:bg-cyan-400 transition-colors`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
