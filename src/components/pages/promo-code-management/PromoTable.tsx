/* ====================== PromoTable.tsx ====================== */
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";

interface PromoRow {
  id: number;
  promoCode: string;
  type: "Percentage" | "Flat" | string;
  usageLimit: number;
  startTime: string; // keep your existing string dates
  endTime: string;
  status: "Active" | "Inactive" | string;
}

interface TableProps {
  promos: PromoRow[];
  toggleStates: Record<number, boolean>;
  handleToggle: (id: number) => void;
  headerNames: string[];
}

export function Table({
  promos,
  toggleStates,
  handleToggle,
  headerNames,
}: TableProps) {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="bg-white/20 mt-4 rounded-lg backdrop-blur-sm px-6 py-4 mb-2 border border-white/30">
        {/* Updated grid to match new columns while keeping style */}
        <div className="grid grid-cols-[50px_1fr_140px_120px_1fr_1fr_90px_160px] gap-4 text-[16px] font-medium text-white">
          {headerNames.map((header, i) => (
            <div
              key={i}
              className={`whitespace-nowrap ${
                i === headerNames.length - 1 ? "text-center" : ""
              }`}
            >
              {header}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/20 overflow-x-auto max-w-full">
        <div className="p-4 space-y-4">
          {promos.map((row, idx) => (
            <div
              key={row.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 p-2 hover:bg-white/95 transition-all duration-200"
            >
              <div className="grid grid-cols-[50px_1fr_140px_120px_1fr_1fr_90px_160px] gap-4 items-center text-sm">
                {/* SL */}
                <div className="text-[#100F0E] font-medium ml-3">{row.id}</div>

                {/* Promo Code */}
                <div className="text-[#100F0E] font-medium">
                  {row.promoCode}
                </div>

                {/* Type */}
                <div className="text-[#100F0E]">{row.type}</div>

                {/* Usage Limit */}
                <div className="text-[#100F0E]">{row.usageLimit}</div>

                {/* Start Time */}
                <div className="text-[#100F0E]">{row.startTime}</div>

                {/* End Time */}
                <div className="text-[#100F0E]">{row.endTime}</div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      toggleStates[row.id]
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {toggleStates[row.id] ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Action */}
                <div className="flex justify-center items-center gap-2 w-[125px] mx-auto border border-cyan-500 rounded-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>

                  <button
                    onClick={() => handleToggle(row.id)}
                    className={`relative inline-flex h-4 w-10 items-center rounded-full transition-colors focus:outline-none ${
                      toggleStates[row.id] ? "bg-cyan-500" : "bg-gray-300"
                    }`}
                    aria-label={`Toggle status for ${row.promoCode}`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        toggleStates[row.id] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty state (optional) */}
          {promos.length === 0 && (
            <div className="text-center text-sm text-gray-700 py-8">
              No promo codes found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
