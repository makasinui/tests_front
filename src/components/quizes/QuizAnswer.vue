<template>
    <div v-if="type === Questions.EType.CHOICE">
        <form class="flex flex-col">
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
    <div v-else>
        <input id="text-input" type="text" />
        <label for="text-input">{{ answers[0].name }}</label>
    </div>
</template>

<script lang="ts" setup>
import { Questions, type Answers } from '@/types';
import { ref } from 'vue';

interface IProps {
    type: Questions.EType
    answers: Answers.IItemFiltered[]
}

type TEmits = {
    change: [id: number]
}

const props = defineProps<IProps>();
defineEmits<TEmits>();

const localAnswers = ref(props.answers);

const onChecked = (val: boolean, id: number) => {
    const answer = localAnswers.value.find(item => item.id === id)!;
    if(val) {
        localAnswers.value.forEach((item) => {
            item.checked = false;
        })
    }
    
    answer.checked = val
}
</script>