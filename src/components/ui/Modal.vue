<template>
    <div class="fixed top-0 z-10 left-0 w-full h-full bg-black/30" v-if="show">
        <div class="absolute top-1/2 px-4 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[250px] w-full h-full">
            <div class="bg-white w-full h-full">
                <div class="">
                    <Icon
                        icon="entypo:cross"
                        class="bg-red-600 rounded-md text-white"
                        @click="onClose"
                    />
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
