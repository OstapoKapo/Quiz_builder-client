'use client'
import useCreateQuizzeMutation from "@/hooks/useCreateQuizzeMutation";
import { useQuizValidation } from "@/hooks/useQuizValidation";
import { IQuestion, IQuiz } from "@/types";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { useState } from "react";
import toast from "react-hot-toast";
import QuestionEditor from "../components/ui/createQuiz/questionEditor/questionEditor";

export default function CreateQuizPage() {

  const [quiz, setQuiz] = useState<IQuiz>({
    title: "",
    description: "",
    difficulty: "Medium",
    time: 10,
    questions: [],
  });

  const quizzeCreateMutation = useCreateQuizzeMutation();

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { type: "single", text: "", options: ["", "", ""], correct: 0, id: Date.now() + 1 },
      ],
    });
  };

  const updateQuizField = (field: keyof IQuiz, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const updateQuestion = (index: number, field: keyof IQuestion, value: any) => {
    const newQuestions = [...quiz.questions];
    (newQuestions[index] as any)[field] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...quiz.questions];
    if (newQuestions[qIndex].options) {
      newQuestions[qIndex].options![oIndex] = value;
      setQuiz({ ...quiz, questions: newQuestions });
    }
  };

  const setCorrectAnswer = (qIndex: number, value: number | number[] | string) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].correct = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSave = () => {
    const validation = useQuizValidation(quiz);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    createQuiz();
  };

  const createQuiz = () => {
    quizzeCreateMutation.mutate(quiz, {
      onSuccess: () => {
        toast.success("Quiz created successfully!");
      },
      onError: (error: any) => {
        toast.error(parseAxiosError(error));
      },
    })
  }

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      
      <label className="block mb-2 font-semibold">Quiz Title:</label>
      <input className="border p-2 w-full mb-2 underline-none" placeholder="Title" value={quiz.title}
        onChange={(e) => updateQuizField("title", e.target.value)}
      />

      <label className="block mb-2 font-semibold">Description:</label>
      <textarea className="border p-2 w-full mb-2" placeholder="Description" value={quiz.description}
        onChange={(e) => updateQuizField("description", e.target.value)}
      />

      <label className="block mb-2 font-semibold">Max Time (minutes):</label>
      <input className="border p-2 w-full mb-2" type="number" placeholder="Max Time (min)" value={quiz.time}
        onChange={(e) => updateQuizField("time", Number(e.target.value))}
      />

      <label className="block mb-2 font-semibold">Difficulty:</label>
      <select value={quiz.difficulty} onChange={(e) => updateQuizField("difficulty", e.target.value)} className="border p-2 w-full mb-4">
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {quiz.questions.map((q, qIdx) => (
         <QuestionEditor
          key={qIdx}
          question={q}
          index={qIdx}
          onDelete={() => {
            const newQuestions = quiz.questions.filter((_, idx) => idx !== qIdx);
            setQuiz({ ...quiz, questions: newQuestions });
          }}
          updateQuestion={updateQuestion}
          updateOption={updateOption}
          setCorrectAnswer={setCorrectAnswer}
        />
      ))}

      <button onClick={addQuestion} className="mt-2 px-4 py-2 bg-white text-[#6F51F8] rounded">
        Add Question
      </button>

      <button onClick={handleSave} className="mt-4 px-6 py-2 bg-[#6F51F8] text-white rounded ml-10">
        Save Quiz
      </button>
    </div>
  );
}
