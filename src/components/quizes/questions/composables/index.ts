import { httpPostFile } from "@/api/file/file.api";
import { Questions } from "@/types";
import { computed, ref, useTemplateRef } from "vue";

export const useQuestion = (questions: Questions.IItemCreated[]) => {
    const localQuestions = questions;
    const isOpen = ref(false);
    const fileRef = useTemplateRef<HTMLInputElement[]>('fileRef');
    const fileName = ref('');

    const imageTitle = computed(() => {
        if (fileName.value) {
            return fileName.value;
        }

        return 'Добавить изображение';
    });

    const imagePreview = computed(() => {
        if (!fileName.value) return;
        return URL.createObjectURL(fileRef.value?.[0]?.files?.[0] as File);
    });

    const isChoiceType = (question: Questions.IItemCreated) => question.type === Questions.EType.CHOICE;

    const onAddAnswer = (idx: number) => {
        const answers = localQuestions[idx].answers;

        answers.push({
            name: '',
        });
    };

    const onAddResult = (questionIdx: number, answerIdx: number) => {
        localQuestions[questionIdx].answers[answerIdx].result = [];
    };

    const onAddImage = () => {
        fileRef.value?.[0]?.click();
    };

    const onAddFile = async (ev: Event, questionIdx: number) => {
        if (!ev.target) return;
        const target = ev.target as HTMLInputElement;
        if (!target?.files?.[0]) return;

        fileName.value = target.files[0].name;
        const data = await httpPostFile(target.files[0]);
        localQuestions[questionIdx].img = data.id.toString();
    };

    const onDeleteImage = () => {
        if (fileRef.value?.[0]) {
            fileRef.value[0].files = null;
            fileName.value = '';
            fileRef.value[0].value = '';
        }
    };

    const onDeleteAnswer = (questionIdx: number, answerIdx: number) => {
        localQuestions[questionIdx].answers?.splice(answerIdx, 1);
    };

    const onDeleteQuestion = (questionIdx: number) => {
        localQuestions.splice(questionIdx, 1);
    };
    
    return {
        localQuestions,
        isOpen,
        fileRef,
        fileName,
        imageTitle,
        imagePreview,
        isChoiceType,
        onAddAnswer,
        onAddFile,
        onAddImage,
        onAddResult,
        onDeleteAnswer,
        onDeleteImage,
        onDeleteQuestion
    }
};
