'use client'
import { useFilter } from "@/store/FilterContext";
import { Group, Search } from "lucide-react";
import { FC, useState } from "react";
import GroupSettings from "../groupSettings/groupSettings";
import { FilterProps } from "@/types";


const Filter: FC<FilterProps> = ({ sortBy, setSortBy, order, setOrder, search, setSearch }) => {
    const { filterOpen } = useFilter();
    const [open, setOpen] = useState(false);


    return (
        <div className={`flex items-center justify-between transition-opacity duration-300 ${filterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative inline-block">
                <div onClick={() => setOpen(!open)} className="p-2 flex items-center gap-1 border-1 border-white rounded-xl cursor-pointer">
                    <Group/>
                    Group: {sortBy}
                </div>
                {open && (
                    <GroupSettings order={order} sortBy={sortBy} setSortBy={setSortBy} setOrder={setOrder} setOpen={setOpen}/>
                )}
            </div> 
            <div className="p-2 flex items-center gap-1 border-1 border-white rounded-2xl">
                <Search/>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="border-0 outline-none" />
            </div>
        </div>
    )
}

export default Filter;