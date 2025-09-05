export interface IQuiz {
    title: string;
    description: string;
    questions: number;
    id: number;
    difficulty: "Easy" | "Medium" | "Hard";
    time: number;
    passed: number;
}