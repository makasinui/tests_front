<template>
    <div class="select">
        <div
            class="select-wrapper"
            :class="{ 'select-wrapper__open': isOpen }"
            @click.stop="onOpen">
            <span>{{ getTitle() }}</span>
            <Icon
                @click.stop="clearItem"
                v-if="selected"
                icon="entypo:cross" 
            />
            <Icon
                :icon="getIcon"
                width="12"
                height="12" />
        </div>
        <div
            class="select-options"
            v-if="isOpen">
            <span
                v-for="item in items"
                @click.stop="onSelect(item)"
                :key="item.id">
                {{ item.name }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IFilterItem } from '@/types';
import { computed, ref } from 'vue';

interface IProps {
    items: IFilterItem[];
    placeholder: string;
}

type TEmits = {
    select: [id: number];
};

const props = defineProps<IProps>();
const emit = defineEmits<TEmits>();

const isOpen = ref(false);
const selected = ref<IFilterItem | null>();

const getIcon = computed(() => {
    if (isOpen.value) {
        return 'bxs:up-arrow';
    }

    return 'bxs:down-arrow';
});

const onOpen = () => {
    isOpen.value = !isOpen.value;
};

const getTitle = () => {
    if (selected?.value?.id) {
        return selected.value.name;
    }

    return props.placeholder;
};

const onSelect = (item: IFilterItem) => {
    emit('select', item.id);
    selected.value = item;
    isOpen.value = false;
};

const clearItem = () => {
    selected.value = null;
}
</script>

<style>
.select {
    @apply flex flex-col  w-fit text-secondary;
}

.select-wrapper {
    @apply flex px-4 py-2 gap-4 rounded-sm items-center bg-secondary/40;
    @apply duration-200 transition-all;
}

.select-wrapper__open {
    @apply bg-white;
}

.select-options {
    @apply bg-white gap-4 px-4 py-2 flex flex-col w-full duration-200 transition-all;
}
</style>
