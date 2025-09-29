"use client";

import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Table } from "./PromoTable"; // renamed import for clarity

// ===== Sample promo code data =====
const promoData = [
  {
    id: 1,
    promoCode: "AURA50",
    type: "Percentage",
    usageLimit: 200,
    startTime: "01-02-2025 10:00 AM",
    endTime: "15-02-2025 11:59 PM",
    status: "Active",
  },
  {
    id: 2,
    promoCode: "CALL100",
    type: "Flat",
    usageLimit: 50,
    startTime: "05-02-2025 09:00 AM",
    endTime: "20-02-2025 11:59 PM",
    status: "Active",
  },
  {
    id: 3,
    promoCode: "PREMIUM25",
    type: "Percentage",
    usageLimit: 100,
    startTime: "10-02-2025 12:00 PM",
    endTime: "28-02-2025 06:00 PM",
    status: "Inactive",
  },
];

export function PromoCodeManagement() {
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    promoData.reduce((acc, item) => {
      acc[item.id] = item.status === "Active";
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

  const handlePagination = (page: number) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPromos = promoData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(promoData.length / itemsPerPage);

  // ===== New headers =====
  const headerNames = [
    "SL",
    "Promo Code",
    "Type",
    "Usage Limit",
    "Start Time",
    "End Time",
    "Status",
    "Action",
  ];

  return (
    <div className="w-full mx-auto space-y-6 my-5">
      {/* Header Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <div className="flex gap-3">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 px-6 hover:bg-white/30 transition-all duration-200">
            Create New Promo
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        {/* Table */}
        <Table
          promos={currentPromos}
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
