import { IQuiz } from "@/types";
import { useMemo } from "react";

const useSortedQuizzes = (quizzes: IQuiz[], sortBy: string, order: "asc" | "desc", search: string) => {
    return useMemo(() => {
        if (!Array.isArray(quizzes)) return [];

        search = search.trim();

        const filtered = search ? quizzes.filter(quiz => {
           return quiz.title.toLowerCase().includes(search.toLowerCase())
        }) : quizzes;

        return filtered.sort((a, b) => {
            let valueA: number | string = 0;
            let valueB: number | string = 0;
            
            if (sortBy === "questions") {
                valueA = a.questions.length;
                valueB = b.questions.length;
            } else {
                const tmpA = a[sortBy as keyof IQuiz];
                const tmpB = b[sortBy as keyof IQuiz];
                valueA = typeof tmpA === 'string' || typeof tmpA === 'number' ? tmpA : 0;
                valueB = typeof tmpB === 'string' || typeof tmpB === 'number' ? tmpB : 0;
            }

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