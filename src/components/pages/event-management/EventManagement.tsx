// EventManagement.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Table } from "./EventTable"; // Import the Table component

// Sample bundle data
const bundleData = [
  {
    id: 1,
    eventName: "Aura Bundle Event",
    eventType: "Aura Bundle",
    startTime: "01-02-2025 10:00 AM",
    endTime: "01-02-2025 12:00 PM",
    status: "Active",
  },
  {
    id: 2,
    eventName: "Call Bundle Event",
    eventType: "Call Bundle",
    startTime: "02-02-2025 11:00 AM",
    endTime: "02-02-2025 01:00 PM",
    status: "Active",
  },
  {
    id: 3,
    eventName: "Premium Bundle Event",
    eventType: "Premium Bundle",
    startTime: "03-02-2025 12:00 PM",
    endTime: "03-02-2025 02:00 PM",
    status: "Inactive",
  },
];

export function EventManagement() {
  const [statusFilter, setStatusFilter] = useState("Active");
  const [bundleFilter, setBundleFilter] = useState("Aura Bundle");
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    bundleData.reduce((acc, bundle) => {
      acc[bundle.id] = true;
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
  const currentBundles = bundleData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bundleData.length / itemsPerPage);

  // Header names array
  const headerNames = [
    "SL",
    "Event Name",
    "Event Type",
    "Start Time",
    "End Time",
    "Status",
    "Actions",
  ];

  return (
    <div className="w-full mx-auto space-y-6 my-5">
      {/* Header Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 py-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-white" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={bundleFilter} onValueChange={setBundleFilter}>
            <SelectTrigger className="w-40 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 py-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-white" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aura Bundle">Aura Bundle</SelectItem>
              <SelectItem value="Call Bundle">Call Bundle</SelectItem>
              <SelectItem value="Premium Bundle">Premium Bundle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 px-6 hover:bg-white/30 transition-all duration-200">
            Create New Event
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        {/* Table */}
        <Table
          bundles={currentBundles}
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
