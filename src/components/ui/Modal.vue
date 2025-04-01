<template>
    <div class="fixed top-0 z-10 left-0 w-full h-full bg-black/30" v-if="show">
        <div class="absolute top-1/2 px-4 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-fit w-full ">
            <div class="bg-white rounded-2xl w-full h-full">
                <div class="relative">
                    <Icon
                        icon="entypo:cross"
                        class="bg-red-600 absolute -right-2 -top-2 rounded-md text-white"
                        @click="onClose"
                    />
                </div>
                <div class="px-4 py-2 h-full">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface IProps {
    show: boolean;
}

type TEmits = {
    onClose: [];
};

defineProps<IProps>();
const emit = defineEmits<TEmits>();

const onClose = () => emit('onClose');
</script>
