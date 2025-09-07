import { IQuiz } from "@/types";
import QuizzesContainer from "../components/containers/quizzesContainer/quizzesContainer";
import { getAllQuizzesAPI } from "@/api/quizesAPI";



const QuizzesPage = async () => {
    try {
        const data = await getAllQuizzesAPI();
        const quizzes: IQuiz[] = data?.data || []; 
        console.log(quizzes)
        return <QuizzesContainer quizzes={quizzes} />;
    } catch(error) {
        console.error(error);
        return <div>Error loading quizzes</div>;
    }
}

export default QuizzesPage;