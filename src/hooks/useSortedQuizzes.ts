import { IQuiz } from "@/types";
import { useMemo } from "react";

const useSortedQuizzes = (quizzes: IQuiz[], sortBy: string, order: "asc" | "desc", search: string) => {
    return useMemo(() => {

        search = search.trim();

        const filtered = search ? quizzes.filter(quiz => {
           return quiz.title.toLowerCase().includes(search.toLowerCase())
        }) : quizzes;

        return filtered.sort((a, b) => {
            let valueA: number | string = a[sortBy as keyof IQuiz];
            let valueB: number | string = b[sortBy as keyof IQuiz];
            
            if (sortBy === "difficulty") {
                const difficultyOrder = ["Easy", "Medium", "Hard"];
                valueA = difficultyOrder.indexOf(a.difficulty);
                valueB = difficultyOrder.indexOf(b.difficulty);
            }

            if (typeof valueA === "string" && typeof valueB === "string") {
                return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }

            return order === "asc" ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
        });
    }, [quizzes, sortBy, order, search]);
};

export default useSortedQuizzes;