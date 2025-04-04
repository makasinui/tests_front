import { httpPostQuiz } from "@/api/quiz/quiz.api";
import { MIN_LENTH, REQUIRED } from "@/consts";
import type { Quiz } from "@/types";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { computed, type Ref } from "vue";
import { useRouter } from "vue-router";

export const useCreateQuiz = (form: Ref<Quiz.IItemCreated>) => {
    const router = useRouter();

    const rules = computed(() => ({
        name: {
            required: helpers.withMessage(REQUIRED, required),
            minLength: helpers.withMessage(MIN_LENTH(3), minLength(3)),
        },
        description: {
            minLength: helpers.withMessage(MIN_LENTH(1), minLength(1))
        }
    }))
    
    const v$ = useVuelidate(rules, form.value as { name: string; description: string }, { $autoDirty: true });

    const onCreateQuiz = async () => {
        const isValidForm = await v$.value.$validate();
        if(!isValidForm || !form.value.questions?.length) return
        try {
            await httpPostQuiz(form.value);
            router.push('/')
        } catch(err) {
            console.error(err);
        }
    }

    return {
        rules,
        v$,
        onCreateQuiz
    }
}