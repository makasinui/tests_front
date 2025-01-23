<template>
    <Title>Тесты онлайн</Title>
    <Select placeholder="Категории" :items="mockCategories" />
</template>

<script lang="ts" setup>
const mockCategories = [
    {
        id: 1,
        name: 'Custom...'
    },
    {
        id: 2,
        name: 'Custom...'
    }
]
</script>