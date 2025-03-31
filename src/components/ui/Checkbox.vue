<template>
    <div
        class="flex items-center gap-4 px-4"
        @click="onClick">
        <Transition name="slide-fade">
            <Icon
                :icon="currentIcon"
                class="transition-opacity duration-200 ease-linear"
                :width="small ? '24' : '34'"
                :height="small ? '24' : '34'"
            />
        </Transition>

        <span :class="twMerge('text-[1.25rem]', labelClassName)">{{ label }}</span>
    </div>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

interface IProps {
    modelValue: boolean;
    label: string;
    labelClassName?: string;
    small?: boolean;
}

type TEmits = {
    'update:modelValue': [val: boolean];
};

const props = defineProps<IProps>();
const emit = defineEmits<TEmits>();

const currentIcon = computed(() => {
    if (props.modelValue) {
        return 'mdi:checkbox-marked';
    }

    return 'mdi:checkbox-blank-outline';
});

const onClick = () => {
    emit('update:modelValue', !props.modelValue);
};
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
