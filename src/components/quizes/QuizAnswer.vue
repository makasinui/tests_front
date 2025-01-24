<template>
    <div v-if="type === Questions.EType.CHOICE">
        <form>
            <div class="px-4" v-for="item in answers" :key="item.id">
                <input :id="item.id.toString()" name="answer" type="radio">
                <label :for="item.id.toString()" class="pl-4">{{ item.name }}</label>
            </div>
        </form>
    </div>
    <div v-else>
        <input type="text" />
        {{ answers[0].name }}
    </div>
</template>

<script lang="ts" setup>
import { Questions, type Answers } from '@/types';

interface IProps {
    type: Questions.EType
    answers: Answers.IItem[]
}

defineProps<IProps>();
</script>