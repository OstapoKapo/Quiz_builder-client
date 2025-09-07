import { GroupSettingsProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { FC, useEffect, useRef } from "react";

const GroupSettings: FC<GroupSettingsProps> = ({ setOpen, setSortBy, setOrder, order, sortBy }) => {

    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSortChange = (newSort: string) => {
        setSortBy(newSort);
    };

    const handleOrderChange = (newOrder: "asc" | "desc") => {
        setOrder(newOrder);
    };

    return (
         <AnimatePresence>
            <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-10 mt-2 right-0 w-48 bg-white border shadow-lg rounded p-3 z-50"
            >
             <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-sm font-medium">
                  Sort by:
                </label>
                <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-black text-black rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="time">Time</option>
                  <option value="questions">Questions</option>
                  <option value="difficulty">Difficulty</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-sm font-medium">
                  Order:
                </label>
                <select value={order} onChange={(e) => handleOrderChange(e.target.value as "asc" | "desc")}
                  className="border border-black text-black  rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            </motion.div>
        </AnimatePresence>
    );
};
export default GroupSettings;
