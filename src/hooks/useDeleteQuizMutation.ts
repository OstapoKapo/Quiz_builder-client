import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuizAPI } from "@/api/quizesAPI";

export default function useDeleteQuizzeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteQuizAPI,
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ['quizzes'] });

            const previousQuizzes = queryClient.getQueryData(['quizzes']);

            queryClient.setQueryData(['quizzes'], (old: any) => {
                if (!Array.isArray(old)) return old;
                return old.filter((quiz: any) => quiz.id !== id);
            });

            return { previousQuizzes };
        },
        onError: (_err, _id, context) => {
            if (context?.previousQuizzes) {
                queryClient.setQueryData(['quizzes'], context.previousQuizzes);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        }
    });
}
