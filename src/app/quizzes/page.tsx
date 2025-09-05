import { IQuiz } from "@/types";
import Quiz from "../components/ui/quiz/quiz";

const QuizzesPage = () => {

    const arr = [
        {
            title: 'Quiz 1',
            description: 'Description for Quiz 1',
            questions: 10,
            id: 1
        },
        {
            title: 'Quiz 1',
            description: 'Description for Quiz 1',
            questions: 10,
            id: 2
        },
        {
            title: 'Quiz 1',
            description: 'Description for Quiz 1',
            questions: 10,
            id: 3   
        },
        {
            title: 'Quiz 1',
            description: 'Description for Quiz 1',
            questions: 10,
            id: 4
        },
        {
            title: 'Quiz 1',
            description: 'Description for Quiz 1 Description for Quiz 1 Description for Quiz 1 Description for Quiz 1',
            questions: 10,
            id: 5
        }
    ]

    return (
        <main className="p-10 mt-5 gap-5 flex flex-wrap">
            {arr.map((quiz: IQuiz, index: number) => (
                <Quiz key={quiz.id} quiz={quiz}/>
            ))}
        </main>
    )
}

export default QuizzesPage;