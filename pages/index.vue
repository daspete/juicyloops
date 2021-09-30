<template>
    <div class="page">
        <JuicyLoops />
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
* {
    @apply select-none;
    scrollbar-width: thin;
    scrollbar-color: theme('colors.indigo.200') theme('colors.black');
    
    &::-webkit-scrollbar {
        width: 4px;

        &-track {
            @apply bg-black;
        }

        &-thumb {
            @apply bg-indigo-200;
            @apply rounded-lg;
        }
    }
}
</style>