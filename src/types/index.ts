export interface IQuiz {
    title: string;
    description: string;
    questions: IQuestion[];
    id?: number;
    difficulty: "Easy" | "Medium" | "Hard";
    time: number;
}

    
export interface IQuestion {
  type:  "single" | "multiple" | "text";
  text: string;
  options?: string[];
  correct?: number | number[] | string;
  id: number;
}

export interface PrimitiveAnswer{
   value: string | number;
}
export interface UserAnswer {
  [questionId: number]: string | string[] | number;
}