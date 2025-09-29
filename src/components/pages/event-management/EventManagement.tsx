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
import { Table } from "./EventTable";

import CreateEventDialog from "@/components/modal/CreateEventDialog";
import { CreateEventFormValues } from "./CreateEventForm";

// Sample bundle data (make this stateful so we can append new events)
const initialData = [
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

  const [bundles, setBundles] = useState(initialData);

  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    initialData.reduce((acc, bundle) => {
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

  // Derived pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBundles = bundles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bundles.length / itemsPerPage);

  // Headers
  const headerNames = [
    "SL",
    "Event Name",
    "Event Type",
    "Start Time",
    "End Time",
    "Status",
    "Actions",
  ];

  // On Create Event submit (from modal)
  const handleCreateEvent = async (values: CreateEventFormValues) => {
    // Map modal values to your table shape
    const nextId = Math.max(0, ...bundles.map((b) => b.id)) + 1;

    const newRow = {
      id: nextId,
      eventName: values.eventName,
      // turn enum values into labels if you want:
      eventType:
        values.eventType === "unlimited_ad_time"
          ? "Unlimited Ad Time"
          : values.eventType === "limited_slots"
          ? "Limited Slots"
          : "Premium Event",
      // convert ISO datetime-local to your display format if needed
      startTime: new Date(values.startDateTime).toLocaleString(),
      endTime: new Date(values.endDateTime).toLocaleString(),
      status: "Active",
    };

    setBundles((prev) => [newRow, ...prev]);
    setToggleStates((prev) => ({ ...prev, [nextId]: true }));

    // TODO: call your API here if needed
    // await api.createEvent(values)
  };

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
          {/* Use the modal here as a trigger */}
          <CreateEventDialog
            trigger={
              <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 px-6 hover:bg-white/30 transition-all duration-200">
                Create New Event
              </Button>
            }
            onSubmit={handleCreateEvent}
          />
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        {/* Table */}
        <Table
          bundles={currentBundles}
          toggleStates={toggleStates}
          handleToggle={handleToggle}
          headerNames={headerNames}
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
