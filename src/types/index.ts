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

export interface MultipleChoiceOptionsProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  questionId: number;
}

export interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
  disableSubmit: boolean;
  isSubmitting: boolean;
  isLastQuestion: boolean;
}

export interface QuizTimerProps {
  initialTime: number; // in minutes
  onTimeEnd: () => void;
}

export interface SingleChoiceOptionsProps {
  options: string[];
  selected: string | undefined;
  onChange: (value: string) => void;
  questionId: number;
}

export interface TextAnswerProps {
  value: string;
  onChange: (value: string) => void;
}

export interface PaginationProps {
    setCurrentPage: (page: number) => void;
    currentPage: number;
    pages: IQuiz[][];
}

export interface GroupSettingsProps {
    setOpen: (open: boolean) => void;
    setSortBy: (sortBy: string) => void;
    setOrder: (order: "asc" | "desc") => void;
    order: "asc" | "desc";
    sortBy: string;
}

export interface FilterProps {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    order: "asc" | "desc";
    setOrder: (order: "asc" | "desc") => void;
    search: string;
    setSearch: (search: string) => void;
}
export interface QuestionEditorProps {
  question: IQuestion;
  index: number;
  onDelete: () => void;
  updateQuestion: (index: number, field: keyof IQuestion, value: any) => void;
  updateOption: (qIndex: number, oIndex: number, value: string) => void;
  setCorrectAnswer: (qIndex: number, value: number | number[] | string) => void;
}

export interface SingleAndMultipleQuestionProps {
    question: IQuestion;
    index: number;
    updateOption: (qIndex: number, oIndex: number, value: string) => void;
    setCorrectAnswer: (qIndex: number, value: number | number[] | string) => void;
}