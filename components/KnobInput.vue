<template>
    <div class="knob" @mousedown="StartDrag">
        <div class="knob__dial">
            <div class="knob__dialgrip" :style="DialStyles"></div>
            <svg class="knob__dialsvg" viewBox="0 0 100 100">
                <path d="M20,76 A 40 40 0 1 1 80 76" fill="none" stroke="none"/>
                <path d="M20,76 A 40 40 0 1 1 80 76" fill="none" :stroke="Color" :style="{ 'stroke-dashoffset': SvgRotation }" />
            </svg>
            <div class="absolute top-0 pt-4 text-xs text-center w-full text-gray-400">
                <slot>
                    {{ Math.floor(value * 10) / 10 }}
                </slot>
            </div>
        </div>
        <div class="-mt-2 text-xs text-center text-gray-400" v-if="label != ''">{{ label }}</div>
    </div>
</template>

<script>
export default {
    props: {
        value: { type: Number, default: 0.5 },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 1 },
        step: { type: Number, default: 0.01 },
        color: { type: String, default: '#F59E0B' },
        label: { type: String, default: '' },
    },

    data(){
        return {
            dragging: false,
            dragStartY: 0,
        }
    },

    computed: {
        IsActive(){
            return true
        },
        Color(){
            return this.color
        },
        Percentage(){
            return (this.value - this.min) / (this.max - this.min)
        },
        SvgRotation(){
            return 184 - 184 * this.Percentage
        },
        DialStyles(){
            return {
                transform: `translate(-50%,-50%) rotate(${ -136 + this.Percentage * 270  }deg)`
            }
        }
    },
    mounted(){
        window.addEventListener('mouseup', this.EndDrag.bind(this))
        window.addEventListener('mousemove', this.Drag.bind(this))
    },

    beforeDestroy(){
        window.removeEventListener('mouseup', this.EndDrag.bind(this))
        window.removeEventListener('mousemove', this.Drag.bind(this))
    },

    methods: {
        StartDrag(e){
            this.dragging = true
            this.dragStartY = e.clientY
        },
        EndDrag(e){
            this.dragging = false
        },
        Drag(e){
            if(!this.dragging) return
            
            let delta = e.clientY - this.dragStartY
            
            let newValue = this.value - delta * this.step
            newValue = Math.max(this.min, Math.min(this.max, newValue))

            this.$emit('input', newValue)

            this.dragStartY = e.clientY
        }
    }
}
</script>

<style lang="scss">
.knob {
    @apply relative;

    &__dial {
        @apply relative;
        @apply w-12;
        @apply h-12;
        transition: 0s;
    }

    &__dialgrip {
        width: calc(100% - 1rem);
        height: calc(100% - 1rem);
        @apply border-4;
        @apply border-black;
        @apply rounded-full;
        @apply absolute;
        @apply bg-gray-700;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0s;
        

        // &:after {
        //     content: "";
        //     @apply absolute;
        //     top: 10%;
        //     left: 50%;
        //     height: 25%;
        //     background-color: #e4e8ea;
        //     width: 2px;
        //     transform: translateX(-50%);
        // }
    }

    &__dialsvg {
        @apply pointer-events-none;
        @apply absolute;
        stroke-width: 4;
        stroke-dasharray: 184 184;
        stroke-linecap: round !important;

        path {
            transition: 0.18s ease-out;
        }
    }
}
</style>