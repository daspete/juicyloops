<template>
    <div class="track">
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

            <div class="w-36 items-center gap-2 flex track__volumecontrols">
                <KnobInput v-model="TrackVolume" :min="-40" :max="6" :step="0.5" label="Vol" />
                <KnobInput v-model="TrackPan" :min="-1" :max="1" :step="0.01" color="#10B981" label="Pan" />
                

                <button :class="`${ track.muted ? 'text-red-500' : 'text-green-500' }`" @click="TrackMuted = !track.muted">
                    <font-awesome-icon :icon="['fas', track.muted ? 'volume-mute' : 'volume-up']"  />
                </button>
            </div>

            <div class="flex-grow h-12">
                <div class="w-full h-full flex gap-1  px-1 py-1" v-if="!updateTrack">
                    <div class="flex-grow" v-for="step in $parent.sequenceLength" :key="`step-${ track.id }-${ step }`">
                        <button 
                            :class="`track__stepbutton w-full h-full border-2 border-gray-900 shadow-lg ${ GetStepBackgroundColor(step - 1) }`"
                            @click="ToggleStep(step - 1)"
                        ></button>
                    </div>
                </div>
            </div>

            <div class="w-6 text-indigo-400">
                <button @click="settingsOpen = !settingsOpen">
                    <font-awesome-icon :icon="['fas', `cogs`]"  />
                </button>
            </div>
        </div>
        <div class="px-2 py-1 flex bg-indigo-800 bg-opacity-20" v-if="settingsOpen">
            <div class="w-12">
                <KnobInput v-model="TrackNote" color="#3B82F6" label="Note" :options="track.availableNotes" />
            </div>
            <div class="w-12">
                <KnobInput v-model="TrackTune" color="#3B82F6" label="Tune" :options="track.availableTunes" />
            </div>
            <div class="w-12">
                <KnobInput v-model="TrackOctave" color="#3B82F6" label="Oct" :options="track.availableOctaves"/>
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
            updateTrack: false,
            settingsOpen: false,
        }
    },

    computed: {
        TrackClasses() {
            let classes = [
                'flex',
                'items-center',
                'gap-2',
                'pl-3',
                'pr-2',
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
        TrackTune: {
            get() {
                return this.track.tune
            },
            set(value) {
                this.track.setTune(value)
            }
        },
        TrackOctave: {
            get() {
                return this.track.octave
            },
            set(value) {
                this.track.setOctave(value)
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
            if(this.playStep == step) return 'bg-gradient-to-b to-yellow-600 from-yellow-100'
            if(this.track.pattern[step] == 1) return 'bg-gradient-to-b to-yellow-900 from-yellow-500'
            if(step % 4 == 0) return 'bg-gradient-to-b to-gray-900 from-indigo-900'
            return 'bg-gradient-to-b to-gray-900 from-indigo-700'
            // return 'bg-gray-900'
        }
    }
}
</script>

<style lang="scss">
.track {
    @apply shadow-lg;

    &__stepbutton {
        // transition: all .252s ease-out;
    }
}
</style>