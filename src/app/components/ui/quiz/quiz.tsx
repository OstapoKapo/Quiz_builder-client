'use client'
import { IQuiz } from "@/types";
import { FC } from "react";
import {X} from "lucide-react";
import { useRouter } from "next/navigation";

interface IQuizProps {
    quiz: IQuiz;
}

const Quiz: FC<IQuizProps> = ({ quiz }) => {
    const router = useRouter();

    const handleOpenQuiz = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/quizzes/${quiz.id}`);
    }

    const handleDeleteQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }

    return (
        <div onClick={handleOpenQuiz} className="p-5 gap-5 w-80 h-50 flex flex-col bg-[#6F51F8] rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-bold">{quiz.title}</h2>
                <button onClick={handleDeleteQuiz} className="p-1.5 flex items-center w-max border-1 border-white rounded-2xl">
                    <X/>
                    Delete
                </button>
            </div>
            <div className="h-[70%] flex items-center">
                <p className="text-white">{quiz.description}</p>
            </div>
            <span className="text-white">{quiz.questions} questions</span>
        </div>
    )
}

export default Quiz;