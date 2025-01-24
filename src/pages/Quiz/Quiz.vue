<template>
    <div class="pt-20 bg-quiz">
        <Spinner v-if="isLoading && currentStep" />
        <div class="flex h-screen">
            {{ currentStep?.name }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { httpGetQeustions } from '@/api/questions/questions.api';
import type { Questions } from '@/types';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params as { id: string };
const step = ref(0);

const isLoading = ref(false);
const questions = ref<Questions.IItem[]>();

const fetch = async () => {
    isLoading.value = true;
    questions.value = await httpGetQeustions(id);
    isLoading.value = false;
};

const currentStep = computed(() => questions.value?.[step.value] ?? null)

onMounted(async () => {
    await fetch();
});
</script>