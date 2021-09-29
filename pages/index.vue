<template>
    <div class="page">
        <JuicyLoops />
    </div>
</template>

<script>
export default {
    mounted(){
        // window.addEventListener('keydown', (e) => {
        //     console.log(e.key)
        //     if(e.key == 'n'){
        //         this.$store.commit('player/AddTrack')
        //     }
        //     if(e.key == ' '){
        //         this.$store.commit('player/SetIsPlaying', !this.$store.getters['player/IsPlaying'])
        //     }
            
        // })
    }
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