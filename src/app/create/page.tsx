'use client'
import useCreateQuizzeMutation from "@/hooks/useCreateQuizzeMutation";
import { IQuestion, IQuiz } from "@/types";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import toast from "react-hot-toast";


type QuestionType = "single" | "multiple" | "text";

export default function CreateQuizPage() {

  const router = useRouter();

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

  const validateQuiz = (): { valid: boolean; message: string } => {
    if (!quiz.title.trim()) return { valid: false, message: "Title is required" };
    if (!quiz.description.trim()) return { valid: false, message: "Description is required" };
    if (!quiz.time || quiz.time <= 0) return { valid: false, message: "Max time should be greater than 0" };

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      if (!q.text.trim()) return { valid: false, message: `Question ${i + 1} text is required` };

      if ((q.type === "single" || q.type === "multiple") && q.options) {
        for (let j = 0; j < q.options.length; j++) {
          if (!q.options[j].trim())
            return { valid: false, message: `Question ${i + 1}, Option ${j + 1} cannot be empty` };
        }
      }

      if (q.type === "single" && (q.correct === undefined || q.correct === null))
        return { valid: false, message: `Question ${i + 1}: select correct option` };
      if (q.type === "multiple" && ((q.correct as number[]).length === 0))
        return { valid: false, message: `Question ${i + 1}: select at least one correct option` };
      if (q.type === "text" && !(q.correct as string)?.trim())
        return { valid: false, message: `Question ${i + 1}: correct answer cannot be empty` };
    }

    return { valid: true, message: "Quiz is valid" };
  };

  const handleSave = () => {
    const validation = validateQuiz();
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    createQuiz();
  };

  const createQuiz = () => {
    quizzeCreateMutation.mutate(quiz, {
      onSuccess: (data) => {
        toast.success("Quiz created successfully!");
        router.push(`/quizzes/${data.id}`);
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
      <input 
        className="border p-2 w-full mb-2 underline-none"
        placeholder="Title"
        value={quiz.title}
        onChange={(e) => updateQuizField("title", e.target.value)}
      />

      <label className="block mb-2 font-semibold">Description:</label>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={quiz.description}
        onChange={(e) => updateQuizField("description", e.target.value)}
      />

      <label className="block mb-2 font-semibold">Max Time (minutes):</label>
      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Max Time (min)"
        value={quiz.time}
        onChange={(e) => updateQuizField("time", Number(e.target.value))}
      />

      <label className="block mb-2 font-semibold">Difficulty:</label>
      <select
        value={quiz.difficulty}
        onChange={(e) => updateQuizField("difficulty", e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {quiz.questions.map((q, qIdx) => (
        <div key={qIdx} className="border p-5 flex gap-5 flex-col mb-2 rounded relative">
          <button
            onClick={() => {
              const newQuestions = quiz.questions.filter((_, idx) => idx !== qIdx);
              setQuiz({ ...quiz, questions: newQuestions });
            }}
            className="text-red-500 font-bold self-end"
          >
            Delete
          </button>

          <input
            className="border p-2 w-full mb-2"
            placeholder="Question text"
            value={q.text}
            onChange={(e) => updateQuestion(qIdx, "text", e.target.value)}
          />

          <select
            value={q.type}
            onChange={(e) => {
              const type = e.target.value as QuestionType;
              updateQuestion(qIdx, "type", type);
              if (type === "single") setCorrectAnswer(qIdx, 0);
              else if (type === "multiple") setCorrectAnswer(qIdx, []);
              else setCorrectAnswer(qIdx, "");
            }}
            className="border p-2 w-full mb-2"
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="text">Text</option>
          </select>

          {(q.type === "single" || q.type === "multiple") && (
            <div className="mb-2">
              {q.options!.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2 mb-1">
                  <input
                    className="border p-2 w-full"
                    placeholder={`Option ${oIdx + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                  />
                  {q.type === "single" ? (
                    <input
                      type="radio"
                      checked={q.correct === oIdx}
                      onChange={() => setCorrectAnswer(qIdx, oIdx)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={(q.correct as number[]).includes(oIdx)}
                      onChange={() => {
                        let newCorrect = [...(q.correct as number[])];
                        if (newCorrect.includes(oIdx)) newCorrect = newCorrect.filter(i => i !== oIdx);
                        else newCorrect.push(oIdx);
                        setCorrectAnswer(qIdx, newCorrect);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {q.type === "text" && (
            <input
              className="border p-2 w-full"
              placeholder="Correct answer"
              value={q.correct as string}
              onChange={(e) => setCorrectAnswer(qIdx, e.target.value)}
            />
          )}
        </div>
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
