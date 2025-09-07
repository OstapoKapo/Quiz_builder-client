export interface IQuiz {
    title: string;
    description: string;
    questions: IQuestion[];
    id?: number;
    difficulty: "Easy" | "Medium" | "Hard";
    time: number;
}

export interface UserAnswer {
  questionId: number;
  answer: string | number | number[]; // в залежності від типу питання
};
    
export interface IQuestion {
  type:  "single" | "multiple" | "text";
  text: string;
  options?: string[];
  correct?: number | number[] | string;
  id: number;
}