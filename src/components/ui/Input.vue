<template>
    <div class="flex flex-col gap-1 relative">
        <span class="relative">
            {{ label }}
        </span>
        <input
            class="relative p-2 rounded-md border"
            type="text"
            :value="modelValue"
            :placeholder="placeholder ?? 'Введите значение'"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <div
            class="absolute -right-1.5 top-5"
            v-if="required"
        >
            <Icon
                width="12"
                height="12"
                icon="mdi:required"
                class="text-red-700"
            />
        </div>
        <ErrorField :error="error?.[0]?.$message" />
    </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';

interface IProps {
    label: string;
    modelValue: string;
    placeholder?: string;
    error?: ErrorObject[];
    required?: boolean;
}

type TEmits = {
    'update:modelValue': [value: string];
};

const emit = defineEmits<TEmits>();
defineProps<IProps>();
</script>
