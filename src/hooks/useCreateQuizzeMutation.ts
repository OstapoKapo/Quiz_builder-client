import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuizAPI } from "@/api/quizesAPI";

export default function useCreateQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuizAPI,
    onMutate: async (newQuiz) => {
      await queryClient.cancelQueries({ queryKey: ['quizzes'] });

      const previousQuizzes = queryClient.getQueryData(['quizzes']);

      queryClient.setQueryData(['quizzes'], (old: any) => {
        if (!old?.data) return old;
        return { 
          ...old, 
          data: [...old.data, newQuiz] 
        };
      });

      return { previousQuizzes };
    },
    onError: (_err, _newQuiz, context) => {
      if (context?.previousQuizzes) {
        queryClient.setQueryData(['quizzes'], context.previousQuizzes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}
