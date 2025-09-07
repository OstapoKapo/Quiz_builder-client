'use client';

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getQuizByIdAPI, submitQuizAPI } from "@/api/quizesAPI";
import { toast } from "react-hot-toast";
import { UserAnswer } from "@/types";
import SingleChoiceOptions from "@/app/components/ui/quizPlay/SingleChoiceOptions/SingleChoiceOptions";
import MultipleChoiceOptions from "@/app/components/ui/quizPlay/multiChoiseOptions/multiChoiseOptions";
import TextAnswer from "@/app/components/ui/quizPlay/textAnswer/textAnswer";
import QuizNavigationButtons from "@/app/components/ui/quizPlay/quizNavigationButtons/quizNavigationButtons";
import QuizTimer from "@/app/components/ui/quizPlay/quizTimer/quizTimer";

const QuizPlayPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuizByIdAPI(Number(id)),
  });

  const quiz = data?.data;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.time * 60 || 0); 


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
      const {correct} = await submitQuizAPI(parseInt(quiz.id), answers);
      toast.success(`Quiz submitted! You got ${correct} out of ${quiz.questions.length} correct.`);
      router.push("/quizzes");
    } catch (error) {
      toast.error("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTimeEnd = () => {
    toast.error("Time's up! Submitting your answers...");
    router.push("/quizzes");
  }

  const isAnswered = answers[currentQuestion.id] && (
    Array.isArray(answers[currentQuestion.id]) ? 
    (answers[currentQuestion.id] as string[]).length > 0 : 
    typeof answers[currentQuestion.id] === 'string' ? answers[currentQuestion.id] !== "" : true
  );

  return (
    <main className="max-w-2xl mx-auto py-10 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <QuizTimer initialTime={quiz.time} onTimeEnd={() => onTimeEnd()} />
      </div>
      <p className="text-gray-600">{quiz.description}</p>

      <div className="p-4 border rounded-lg flex flex-col gap-3">
        <h2 className="font-semibold">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h2>
        <p>{currentQuestion.text}</p>

        {currentQuestion.type === "single" && currentQuestion.options && (
          <SingleChoiceOptions
            options={currentQuestion.options}
            selected={answers[currentQuestion.id] as string | undefined}
            onChange={(value) => handleChange(currentQuestion.id, value)}
            questionId={currentQuestion.id}
          />
        )}

        {currentQuestion.type === "multiple" && currentQuestion.options && (
          <MultipleChoiceOptions
            options={currentQuestion.options}
            selected={answers[currentQuestion.id] as string[]}
            onChange={(value) => handleChange(currentQuestion.id, value)}
            questionId={currentQuestion.id}
          />
        )}

        {currentQuestion.type === "text" && (
          <TextAnswer
            value={String(answers[currentQuestion.id] || "")}
            onChange={(value) => handleChange(currentQuestion.id, value)}
          />
        )}

      </div>

      <QuizNavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        disablePrevious={currentQuestionIndex === 0}
        disableNext={currentQuestionIndex === quiz.questions.length - 1 || !isAnswered}
        disableSubmit={!isAnswered || isSubmitting}
        isSubmitting={isSubmitting}
        isLastQuestion={currentQuestionIndex === quiz.questions.length - 1}
      />
    </main>
  );
};

export default QuizPlayPage;
