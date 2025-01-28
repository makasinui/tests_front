<template>
    <div class="flex flex-col gap-1">
        <span>{{ label }}</span>
        <input 
            class="p-2 rounded-md border" type="text"
            :value="modelValue"
            :placeholder="placeholder ?? 'Введите значение'"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>

<script lang="ts" setup>
interface IProps {
    label: string
    placeholder?: string
    modelValue: string
};

type TEmits = {
    'update:modelValue': [value: string]
}

const emit = defineEmits<TEmits>();
defineProps<IProps>();
</script>