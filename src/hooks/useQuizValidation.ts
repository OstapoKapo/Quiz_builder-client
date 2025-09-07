import { IQuiz } from "@/types";

export const useQuizValidation = (quiz: IQuiz): { valid: boolean; message: string } => {
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