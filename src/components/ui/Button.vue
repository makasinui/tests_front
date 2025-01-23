<template>
    <button 
        class="button"
    >
        <slot></slot>
    </button>
</template>

<style>
.button {
    @apply px-6 py-2 flex items-center justify-center font-bold text-lg bg-button text-white rounded-lg;
    @apply transition-all duration-200;
}
.button:active {
    @apply scale-[.85];
}
</style>