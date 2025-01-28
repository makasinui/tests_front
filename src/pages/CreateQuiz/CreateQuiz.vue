<template>
    <section class="bg-main-bg h-full pt-20 px-4">
        <Title class="text-center">Создание опроса</Title>
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <Input 
                    v-model="name" 
                    label="Название" 
                    placeholder="Название опроса" 
                />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const name = ref('');
</script>