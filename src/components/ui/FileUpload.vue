<template>
    <div class="flex flex-col">
        <label>{{ label }}</label>
        <input 
            ref="fileUpload"
            @change="onUploadFile" 
            class="hidden" 
            type="file" 
            accept=".jpg, .png, .jpeg, .svg"
        >
        <Button class="text-sm" @click="onOpenFile">
            {{ imageTitle }}
        </Button>
        <div v-if="imagePreview" class="flex items-center gap-2 mt-2">
            <img :src="imagePreview" class="max-h-[200px] object-contain" />
            <Button small @click="onDeleteImage" class="max-w-[100px] mx-auto">
                Удалить
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { httpPostFile } from '@/api/file/file.api';
import { computed, ref, useTemplateRef } from 'vue';

interface IProps {
    label?: string
    modelValue: string;
}

type TEmits = {
    'update:modelValue': [id: string]
}

defineProps<IProps>();
const emit = defineEmits<TEmits>();

const fileName = ref("");
const fileRef = useTemplateRef<HTMLInputElement>('fileUpload');

const imageTitle = computed(() => {
    if (fileName.value) {
        return fileName.value;
    }

    return 'Добавить изображение';
});

const imagePreview = computed(() => {
    if (!fileName.value) return;
    return URL.createObjectURL(fileRef.value?.files?.[0] as File);
});

const onOpenFile = () => {
    if(fileRef.value) {
        if(fileRef.value.files?.length) {
            onDeleteImage();
        }
        fileRef.value.click();
    }
}

const onDeleteImage = () => {
    if (fileRef.value && fileRef.value.files?.length) {
        fileRef.value.files = null;
        fileName.value = '';
        fileRef.value.value = '';
        emit('update:modelValue', '');
    }
};

const onUploadFile = async (ev: Event) => {
    if(!ev.target) return;
    const target = ev.target as HTMLInputElement;
    if (!target?.files?.[0]) return;
    
    fileName.value = target.files[0].name;

    const data = await httpPostFile(target.files[0] as File);
    emit('update:modelValue', data.id.toString())
}

</script>