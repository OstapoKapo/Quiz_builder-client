'use client'
import { IQuiz } from "@/types";
import { FC, useMemo, useState } from "react";
import Filter from "../../ui/filter/filter";
import Quiz from "../../ui/quiz/quiz";
import useSortedQuizzes from "@/hooks/useSortedQuizzes";
import { chunkArray } from "@/hooks/chunkArray";
import Pagination from "../../ui/pagination/pagination";

interface IQuizzesContainerProps {
    quizzes: IQuiz[];
}

const QuizzesContainer: FC<IQuizzesContainerProps> = ({ quizzes }) => {
    const [sortBy, setSortBy] = useState("passed");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;
    const sortedQuizzes = useSortedQuizzes(quizzes, sortBy, order, search);

    const pages =  chunkArray(sortedQuizzes, itemsPerPage);
   

    console.log(pages);

    return (
        <main className="py-5 gap-5 flex flex-col">
            <Filter setSearch={setSearch} search={search} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
            <h1 className="text-2xl font-bold mt-3">Quizzes:</h1>
            <div className="p-5 gap-5 min-h-115 flex flex-wrap justify-center">
                {pages[currentPage - 1]?.map((quiz: IQuiz) => (
                    <Quiz key={quiz.id} quiz={quiz}/>
                ))}
            </div>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </main>
    )
};

export default QuizzesContainer;