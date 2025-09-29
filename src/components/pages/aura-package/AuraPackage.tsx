// AuraPackage.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Table } from "./PackageTable"; // keep your original table file

// Sample data to match the new columns
const packageData = [
  {
    id: 1,
    packageName: "Starter Aura",
    duration: "7 days",
    price: "$4.99",
    userPurchase: "2000",
    createdOn: "01-02-2025",
    status: "Active",
  },
  {
    id: 2,
    packageName: "Pro Aura",
    duration: "30 days",
    price: "$9.99",
    userPurchase: "950",
    createdOn: "02-02-2025",
    status: "Active",
  },
  {
    id: 3,
    packageName: "Premium Aura",
    duration: "90 days",
    price: "$19.99",
    userPurchase: "120",
    createdOn: "03-02-2025",
    status: "Inactive",
  },
];

export function AuraPackage() {
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    packageData.reduce((acc, row) => {
      acc[row.id] = row.status === "Active";
      return acc;
    }, {} as Record<number, boolean>)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleToggle = (id: number) =>
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = packageData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(packageData.length / itemsPerPage);

  const headerNames = [
    "SL",
    "Package Name",
    "Duration",
    "Price",
    "User Purchase",
    "Created On",
    "Status",
    "Action",
  ];

  return (
    <div className="w-full mx-auto space-y-6 my-5">
      {/* Header Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <div className="flex gap-3">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 px-6 hover:bg-white/30 transition-all duration-200">
            Create New Package
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        {/* Table */}
        <Table
          rows={currentRows}
          toggleStates={toggleStates}
          handleToggle={handleToggle}
          headerNames={headerNames}
        />

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
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
