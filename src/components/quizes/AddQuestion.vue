<template>
    <div class="flex">
        Добавить вопрос:
        <Button
            small
            class="ml-auto"
            @click="onClick(Questions.EType.CHOICE)"
        >
            С выбором
        </Button>
        <Button
            small
            class="ml-auto"
            @click="onClick(Questions.EType.TEXT)"
        >
            С полем ввода
        </Button>
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