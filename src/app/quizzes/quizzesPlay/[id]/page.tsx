'use client';

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getQuizByIdAPI, submitQuizAPI } from "@/api/quizesAPI";
import { toast } from "react-hot-toast";

const QuizPlayPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuizByIdAPI(Number(id)),
  });

  const quiz = data?.data;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <div>Loading quiz...</div>;
  if (isError || !quiz || !quiz.questions) return <div>Error loading quiz</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleChange = (questionId: number, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const correct = await submitQuizAPI(quiz.id, answers);
      toast.success(`✅ Quiz submitted! You have ${correct.correct} correct answers.`);
      router.push("/quizzes");
    } catch (error) {
      toast.error("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAnswered = answers[currentQuestion.id] && (
    Array.isArray(answers[currentQuestion.id])
      ? answers[currentQuestion.id].length > 0
      : answers[currentQuestion.id] !== ""
  );

  return (
    <main className="max-w-2xl mx-auto py-10 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">{quiz.title}</h1>
      <p className="text-gray-600">{quiz.description}</p>

      <div className="p-4 border rounded-lg flex flex-col gap-3">
        <h2 className="font-semibold">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h2>
        <p>{currentQuestion.text}</p>

        {/* SINGLE CHOICE */}
        {currentQuestion.type === "single" && currentQuestion.options && (
          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((opt: string, i: number) => (
              <label key={`$${currentQuestion.id}-${i}-${opt}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={opt}
                  checked={answers[currentQuestion.id] === opt}
                  onChange={() => handleChange(currentQuestion.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
        {currentQuestion.type === "multiple" && currentQuestion.options && (
          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((opt: string, i: number) => (
              <label key={`${currentQuestion.id}-${i}-${opt}`} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  checked={answers[currentQuestion.id]?.includes(opt) || false}
                  onChange={(e) => {
                    const prev = answers[currentQuestion.id] || [];
                    if (e.target.checked) {
                      handleChange(currentQuestion.id, [...prev, opt]);
                    } else {
                      handleChange(currentQuestion.id, prev.filter((a: string) => a !== opt));
                    }
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
        {currentQuestion.type === "text" && (
          <input
            type="text"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter your answer"
          />
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-4 py-2 bg-[#6F51F8] text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAnswered || isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        )}
      </div>
    </main>
  );
};

export default QuizPlayPage;
