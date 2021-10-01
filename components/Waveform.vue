<template>
    <div class="waveform w-full">
        <div class="w-full">
            <input class="w-full" type="range" min="0" max="100" step="0.01" v-model="StartRange">
        </div>
        <div class="waveform__content w-full" ref="waveform"></div>
        <div class="w-full">
            <input class="w-full" type="range" min="0" max="100" step="0.01" v-model="EndRange">
        </div>
    </div>
</template>

<script>
let WaveSurfer = null
if(!process.server) WaveSurfer = require('wavesurfer.js')

export default {
    props: {
        track: { type: Object, default: () => ({}) },
        options: { type: Object, default: () => ({}) }
    },

    watch: {
        'track.recordedSampleData'(value){
            this.ReinitializeWaveform()
        }
    },

    data(){
        return {
            wavesurfer: null,
            duration: 0,
            startRange: 0,
            endRange: 100
        }
    },

    computed: {
        StartRange: {
            get(){ return this.startRange },
            set(value){
                this.startRange = parseFloat(value)
                this.track.sampleStartTime = (this.startRange / 100) * this.duration
                this.track.sampleDuration = ((this.endRange / 100) - (this.startRange / 100)) * this.duration
            }
        },
        EndRange: {
            get(){ return this.endRange },
            set(value){
                this.endRange = parseFloat(value)
                this.track.sampleStartTime = (this.startRange / 100) * this.duration
                this.track.sampleDuration = ((this.endRange / 100) - (this.startRange / 100)) * this.duration
            }
        }
    },

    mounted(){
        this.ReinitializeWaveform()
    },

    beforeDestroy(){
        this.wavesurfer.destroy()
    },

    methods: {
        ReinitializeWaveform(){
            if(this.wavesurfer) this.wavesurfer.destroy()
            this.wavesurfer = WaveSurfer.create({
                container: this.$refs.waveform,
                ...this.options
            })
            this.wavesurfer.loadBlob(this.track.recordedSampleData)
            this.wavesurfer.on('ready', () => {
                this.duration = this.wavesurfer.getDuration()
            })
            
        }
    }
}
</script>
