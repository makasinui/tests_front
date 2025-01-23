<template>
    <nav>
        <Icon @click="emit('click')" icon="stash:burger-classic" width="48" height="48" />
    </nav>
</template>

<script lang="ts" setup>
type TEmit = {
    click: []
};

const emit = defineEmits<TEmit>();
</script>