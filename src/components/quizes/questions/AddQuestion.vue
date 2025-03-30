<template>
    <div class="flex gap-2 justify-between">
        Добавить вопрос:
        <div class="flex gap-2">
            <Button
                small
                @click="onClick(Questions.EType.CHOICE)"
            >
                Ответы
            </Button>
            <Button
                small
                @click="onClick(Questions.EType.TEXT)"
            >
                Текст
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Questions } from '@/types';

type TEmits = {
    addQuestion: [type: Questions.EType]
}

const emit = defineEmits<TEmits>();

const onClick = (type: Questions.EType) => {
    emit('addQuestion', type)
}
</script>