'use client'
import { IQuiz } from "@/types";
import { FC, useState } from "react";
import Filter from "../../ui/filter/filter";
import Quiz from "../../ui/quiz/quiz";
import useSortedQuizzes from "@/hooks/useSortedQuizzes";
import { chunkArray } from "@/hooks/chunkArray";
import Pagination from "../../ui/pagination/pagination";
import { getAllQuizzesAPI } from "@/api/quizesAPI";
import { useQuery } from "@tanstack/react-query";

interface IQuizzesContainerProps {
    quizzes: IQuiz[];
}

const QuizzesContainer: FC<IQuizzesContainerProps> = ({ quizzes }) => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['quizzes'], 
        queryFn: getAllQuizzesAPI, 
        staleTime: 1000 * 60 * 5,
        placeholderData: quizzes

    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading quizzes</div>;

    const [sortBy, setSortBy] = useState("time");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;
    const quizzesArray = data?.data ?? [];
    const sortedQuizzes = useSortedQuizzes(quizzesArray, sortBy, order, search);

    const pages =  chunkArray(sortedQuizzes, itemsPerPage);

    console.log(pages)


    return (
        <main className="py-5 gap-5 flex flex-col">
            <Filter setSearch={setSearch} search={search} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
            <h1 className="text-2xl font-bold mt-3">Quizzes:</h1>
            {quizzes.length === 0 ? <div className="text-center text-gray-500">No quizzes found. Create the first one!</div> : (
            <>
            <div className="p-5 gap-5 min-h-115 flex flex-wrap justify-center">
                {pages[currentPage - 1]?.map((quiz: IQuiz) => (
                    <Quiz key={quiz.id} quiz={quiz}/>
                ))}
            </div>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </>
            ) }
        </main>
    )
};

export default QuizzesContainer;