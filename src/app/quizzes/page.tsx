import { IQuiz } from "@/types";
import QuizzesContainer from "../components/containers/quizzesContainer/quizzesContainer";


const QuizzesPage = () => {

    const arr = [
        {
             title: "Sample ",
            description: "This is a sample quiz description.",
    questions: 8,
    id: 1,
    passed: 4,
    difficulty: "Hard",
    time: 12
        },
        {
            title: "Quiz",
    description: "This is a sample quiz description.",
    questions: 2,
    id: 2,
    passed: 4,
    difficulty: "Medium",
    time: 20
        },
        {
            title: "Ostap",
    description: "This is a sample quiz description.",
    questions: 20,
    id: 3,
    passed: 10,
    difficulty: "Easy",
    time: 30 
        },
        {
            title: "Sample Ostap",
    description: "This is a sample quiz description.",
    questions: 2,
    id: 4,
    passed: 1,
    difficulty: "Hard",
    time: 7
        },
        {
             title: "Ostap Quiz",
    description: "This is a sample quiz description.",
    questions: 5,
    id: 5,
    passed: 12,
    difficulty: "Medium",
    time: 9
        },
        {
             title: "Ostap Quiz",
    description: "This is a sample quiz description.",
    questions: 5,
    id: 6,
    passed: 12,
    difficulty: "Medium",
    time: 9
        },
        {
             title: "Ostap Quiz",
    description: "This is a sample quiz description.",
    questions: 5,
    id: 7,
    passed: 12,
    difficulty: "Medium",
    time: 9
        },
        {
             title: "Ostap Quiz",
    description: "This is a sample quiz description.",
    questions: 5,
    id: 8,
    passed: 12,
    difficulty: "Medium",
    time: 9
        }
    ] as IQuiz[];

    return (
        <QuizzesContainer quizzes={arr} />
    )
}

export default QuizzesPage;