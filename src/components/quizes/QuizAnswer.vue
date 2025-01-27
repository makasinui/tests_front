<template>
    <div v-if="type === Questions.EType.CHOICE">
        <form class="flex flex-col gap-2">
            <Checkbox 
                v-for="item in localAnswers" 
                :key="item.id"
                :id="item.id"
                :label="item.name"
                :model-value="item.checked"
                @update:modelValue="onChecked($event, item.id)"
            />
        </form>
    </div>
    <form class="flex flex-col gap-2 px-4" v-else>
        <label for="text-input" class="text-center">{{ answers[0].name }}</label>
        <textarea @input="(ev) => onChecked(ev.target.value, answers[0].id)" id="text-input" type="text" />
    </form>
</template>

<script lang="ts" setup>
import { Questions, type Answers } from '@/types';
import { ref } from 'vue';

interface IProps {
    type: Questions.EType
    answers: Answers.IItemFiltered[]
}

type TEmits = {
    change: [id: number, value: boolean | string]
}

const props = defineProps<IProps>();
const emit = defineEmits<TEmits>();

const localAnswers = ref(props.answers);

const onChecked = (val: boolean | string, id: number) => {
    if(props.type === Questions.EType.CHOICE) {
        const answer = localAnswers.value.find(item => item.id === id)!;
        if(val) {
            localAnswers.value.forEach((item) => {
                item.checked = false;
            })
        }
        answer.checked = !!val
    }

    emit('change', id, val)
}
</script>