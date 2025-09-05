import { IQuiz } from "@/types";
import { FC } from "react";

interface PaginationProps {
    setCurrentPage: (page: number) => void;
    currentPage: number;
    pages: IQuiz[][];
}

const Pagination: FC<PaginationProps> = ({ setCurrentPage, currentPage, pages }) => {

    const handlePagination = (page: number) => {
        if (page < 1) page = 1;
        if (page > pages.length) page = pages.length;
        setCurrentPage(page);
    };

    return (
        <section className="mt-10 flex justify-center gap-10">
            <button onClick={() => handlePagination(currentPage - 1)}>Prev</button>
            <div className="flex gap-4">
                {pages.map((_, index) => (
                    <button onClick={() => setCurrentPage(index + 1)} key={index} className={`cursor-pointer border-1 border-white rounded-full w-10 h-10 flex items-center justify-center ${currentPage === index + 1 && 'bg-white text-black'}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <button onClick={() => handlePagination(currentPage + 1)}>Next</button>
        </section>
    )
}

export default Pagination;
