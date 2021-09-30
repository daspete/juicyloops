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

            <div class="w-49 items-center gap-2 flex track__volumecontrols">
                <KnobInput v-model="TrackVolume" :min="-40" :max="6" :step="0.5" label="Vol" />
                <KnobInput v-model="TrackPan" :min="-1" :max="1" :step="0.01" color="#10B981" label="Pan" />
                
                <div class="pr-1 w-6">
                    <button :class="`${ track.muted ? 'text-red-500' : 'text-green-500' }`" @click="TrackMuted = !track.muted">
                        <font-awesome-icon :icon="['fas', track.muted ? 'volume-mute' : 'volume-up']"  />
                    </button>

                    <button :class="`${ track.isRecording ? 'text-green-500' : 'text-red-500' }`" v-if="track.type == 'microphone'" @click="track.isRecording ? track.stopMicrophoneRecording() : track.startMicrophoneRecording()">
                        <font-awesome-icon :icon="['fas', `circle`]"  />
                    </button>
                </div>

                

                <div class="w-14 flex gap-1 flex-wrap text-xs">
                    <button class="w-6 h-6 rounded-full bg-black text-gray-500 border-2 border-gray-900 font-bold bg-opacity-20" @click="FillEachStep(4)">4</button>
                    <button class="w-6 h-6 rounded-full bg-black text-gray-500 border-2 border-gray-900 font-bold bg-opacity-20" @click="FillEachStep(8)">8</button>
                    <button class="w-6 h-6 rounded-full bg-black text-gray-500 border-2 border-gray-900 font-bold bg-opacity-20" @click="FillEachStep(16)">16</button>
                    <button class="w-6 h-6 rounded-full bg-black text-gray-500 border-2 border-gray-900 font-bold bg-opacity-20" @click="FillEachStep(32)">32</button>
                </div>
            </div>

            <div class="flex-grow h-12">
                <div class="w-full h-full flex gap-1  px-1 py-1" v-if="!updateTrack">
                    <div class="flex-grow" v-for="step in $parent.sequenceLength" :key="`step-${ track.id }-${ step }`">
                        <button 
                            :class="`track__stepbutton w-full h-full border-2 border-gray-900 shadow-lg ${ GetStepBackgroundColor(step - 1) }`"
                            @click="ToggleStep(step - 1)"
                            :id="`patternstep-${ track.id }-${ step - 1 }`"
                            @mousedown="activateStep = !track.pattern[step - 1].active"
                            @mousemove="OnPatternMouseMove"
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

        <div class="px-2 py-2 flex gap-2 bg-indigo-800 bg-opacity-20" v-if="settingsOpen">
            <div class="flex flex-col gap-2 py-2 px-4 bg-black bg-opacity-20 rounded-md shadow-lg">
                <div class="text-center text-gray-400 text-sm">Base settings</div>
                <div class="flex gap-2">
                    <KnobInput v-model="TrackNote" color="#3B82F6" label="Note" :options="track.availableNotes" />
                    <KnobInput v-model="TrackTune" color="#3B82F6" label="Tune" :options="track.availableTunes" />
                    <KnobInput v-model="TrackOctave" color="#3B82F6" label="Oct" :options="track.availableOctaves"/>
                    <KnobInput v-model="TrackLength" color="#3B82F6" label="Len" :options="track.availableLengths"/>
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
            updateTrack: false,
            settingsOpen: false,
            activateStep: false
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
        TrackLength: {
            get() {
                return this.track.length
            },
            set(value) {
                this.track.setLength(value)
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
            this.track.pattern[step].active = !this.track.pattern[step].active
            this.updateTrack = true
            await this.$nextTick()
            this.updateTrack = false
        },

        GetStepBackgroundColor(step){
            if(this.playStep == step) return 'bg-gradient-to-b to-yellow-600 from-yellow-100'
            if(this.track.pattern[step].active) return 'bg-gradient-to-b to-yellow-900 from-yellow-500'
            if(step % 4 == 0) return 'bg-gradient-to-b to-gray-900 from-indigo-900'
            return 'bg-gradient-to-b to-gray-900 from-indigo-700'
        },

        OnPatternMouseMove($event){
            if($event.buttons != 1) return
            if(!$event.target.id) return

            let step = $event.target.id.split('-')[2]

            this.track.pattern[parseInt(step)].active = this.activateStep
            
        },

        FillEachStep(steps){
            for(let i = 0; i < this.track.pattern.length; i++){
                this.track.pattern[i].active = i % steps == 0
            }
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