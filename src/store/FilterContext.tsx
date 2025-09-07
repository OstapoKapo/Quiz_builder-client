'use client'
import { createContext, ReactNode, useContext, useState } from "react";

interface IFilterContext {
    filterOpen: boolean;
    setFilterOpen: (open: boolean) => void;
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <FilterContext.Provider value={{ filterOpen, setFilterOpen }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};