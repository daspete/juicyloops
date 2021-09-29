<template>
    <div :class="TrackClasses">
        <!-- <div class="w-1 h-full bg-yellow-500 track__start"></div> -->
        
        <div class="w-4">
            <button class="text-gray-400" @click="$parent.RemoveTrack(track)">
                <font-awesome-icon :icon="['fas', `times`]"  />
            </button>
        </div>
        
        <div class="w-20">
            <input class="w-full bg-white bg-opacity-20 text-sm px-2 py-1" type="text" v-model="TrackName">
        </div>

        <div class="w-48 items-center gap-2 flex track__volumecontrols">
            <KnobInput v-model="TrackVolume" :min="0" :max="1" :step="0.01" />
            <KnobInput v-model="TrackPan" :min="-100" :max="100" :step="1" color="#10B981" />
            <KnobInput v-model="TrackNote" :min="1" :max="9" :step="0.25" color="#3B82F6" />

            <button :class="`${ track.muted ? 'text-red-500' : 'text-green-500' }`" @click="TrackMuted = !track.muted">
                <font-awesome-icon :icon="['fas', track.muted ? 'volume-mute' : 'volume-up']"  />
            </button>
        </div>
        

        <div class="flex-grow bg-white bg-opacity-20 h-full">
            <div class="w-full h-full flex gap-2 justify-center px-2 py-2" v-if="!updateTrack">
                <div class="flex-grow" v-for="step in $parent.sequenceLength" :key="`step-${ track.id }-${ step }`">
                    <button 
                        :class="`track__stepbutton w-full h-full ${ GetStepBackgroundColor(step - 1) }`"
                        @click="ToggleStep(step - 1)"
                    ></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        track: {
            type: Object,
            required: true,
            default: () => ({})
        },
        playStep: {
            type: Number,
            default: -1
        }
    },

    data(){
        return {
            updateTrack: false
        }
    },

    computed: {
        TrackClasses() {
            let classes = [
                'track',
                'flex',
                'items-center',
                'gap-2',
                'bg-indigo-500',
                'bg-opacity-20',
                'text-gray-300',
            ]

            if(this.track.muted) classes.push('opacity-80')
            
            return classes.join(' ')
        },

        TrackName: {
            get() {
                return this.track.name
            },
            set(value) {
                this.track.name = value
            }
        },

        TrackVolume: {
            get() {
                return this.track.volume
            },
            set(value) {
                this.track.setVolume(parseFloat(value))
            }
        },
        TrackPan: {
            get() {
                return this.track.pan
            },
            set(value) {
                this.track.setPan(parseFloat(value))
            }
        },
        TrackNote: {
            get() {
                return this.track.note
            },
            set(value) {
                this.track.setNote(value)
            }
        },
        TrackMuted: {
            get() {
                return this.track.muted
            },
            set(value) {
                this.track.setMuted(value)
            }
        }
    },

    mounted() {
        
    },

    methods: {
        async ToggleStep(step){
            this.track.pattern[step] = this.track.pattern[step] == 1 ? 0 : 1
            this.updateTrack = true
            await this.$nextTick()
            this.updateTrack = false
        },

        GetStepBackgroundColor(step){
            if(this.playStep == step) return 'bg-white'
            if(this.track.pattern[step] == 1) return 'bg-yellow-500'
            return 'bg-gray-900'
        }
    }
}
</script>

<style lang="scss">
.track {
    &__stepbutton {
        transition: all .12s ease-out;
    }
}
</style>