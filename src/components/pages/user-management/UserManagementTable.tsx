// UserManagement.tsx  (was GameManagement.tsx)
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Table } from "./UserTable"; // reuse your existing Table file

// Sample data matching new headers
const usersData = [
  {
    id: 1,
    userName: "Sabbir Ahmed",
    email: "sabbir@example.com",
    location: "Dhaka, BD",
    phoneNumber: "+8801711000000",
    joiningDate: "01-02-2025",
    report: "View",
    status: "Active",
  },
  {
    id: 2,
    userName: "Arif Hossain",
    email: "arif@example.com",
    location: "Chattogram, BD",
    phoneNumber: "+8801811000000",
    joiningDate: "05-02-2025",
    report: "View",
    status: "Active",
  },
  {
    id: 3,
    userName: "Nusrat Jahan",
    email: "nusrat@example.com",
    location: "Sylhet, BD",
    phoneNumber: "+8801911000000",
    joiningDate: "10-02-2025",
    report: "View",
    status: "Inactive",
  },
];

export function UserManagement() {
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    usersData.reduce((acc, r) => {
      acc[r.id] = r.status === "Active";
      return acc;
    }, {} as Record<number, boolean>)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = usersData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  const headerNames = [
    "SL",
    "User Name",
    "Email",
    "Location",
    "Phone Number",
    "Joining Date",
    "Report",
    "Status",
    "Action",
  ];

  return (
    <div className="w-full mx-auto space-y-6 my-5">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <div className="flex gap-3">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl h-12 px-6 hover:bg-white/30 transition-all duration-200">
            Add New User
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        <Table
          rows={currentRows}
          toggleStates={toggleStates}
          handleToggle={(id) =>
            setToggleStates((p) => ({ ...p, [id]: !p[id] }))
          }
          headerNames={headerNames}
        />

        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`${
                currentPage === i + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-white/20 text-white"
              } rounded-lg px-4 py-2 hover:bg-cyan-400 transition-colors`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
