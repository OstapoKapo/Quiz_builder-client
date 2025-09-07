'use client'
import { getQuizByIdAPI } from "@/api/quizesAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";

const QuizPage =  () => {

    const { id } = useParams();

   const { data, isLoading, isError } = useQuery({
    queryKey: ['quiz', id], 
    queryFn: () => getQuizByIdAPI(Number(id)),
    staleTime: 1000 * 60 * 5,
   });

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error loading quiz</div>;

    const quiz = data.data;

   return (
    <main className="flex items-center justify-center h-[calc(100vh-90px)] w-full">
        <div className="p-10 flex flex-col gap-6 max-w-2xl h-min mx-auto bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800">{quiz.title}</h1>
            <p className="text-gray-600 text-lg">{quiz.description}</p>

            <div className=" gap-5 flex items-center justify-between text-gray-700">
                <span><b>Difficulty:</b> {quiz.difficulty}</span>
                <span><b>Time:</b> {quiz.time} min</span>
                <span><b>Questions:</b> {quiz.questions.length}</span>
            </div>
            <Link href={`/quizzes/quizzesPlay/${quiz.id}`}>
                <button
                className="w-full mt-6 py-3 text-xl font-semibold bg-[#6F51F8] text-white rounded-xl hover:bg-[#5a3ed9] transition"
                >
                    Start Quiz
                </button>
            </Link>
        </div>
    </main>
   )
}

export default QuizPage;