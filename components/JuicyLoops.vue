<template>
    <div class="juicyloops w-screen h-screen overflow-hidden flex flex-col bg-gradient-to-t to-gray-900 from-indigo-900">
        <div class="topbar flex gap-8 text-white justify-between items-center bg-black px-2 shadow-xl">
            <div class="logo">
                <img src="/images/juicyloopslogo.svg" class="w-64" />
            </div>
            <div class="topbar__controls flex gap-4">
                <button v-if="!isPlaying" @click="IsPlaying = true">
                    <font-awesome-icon :icon="['fas', `play`]"  />
                </button>

                <button v-if="isPlaying" @click="IsPlaying = false">
                    <font-awesome-icon :icon="['fas', `pause`]"  />
                </button>

                <button :class="`${ isRecording ? 'text-green-400' : 'text-red-400' }`" @click="IsRecording = !isRecording">
                    <font-awesome-icon :icon="['fas', `circle`]"  />
                </button>

                <input class="bg-white bg-opacity-20 w-16 pl-2" type="number" min="10" max="999" v-model="Bpm">

                <button @click="AddTrack('synth')" class="text-green-600 font-bold">
                    <font-awesome-icon size="lg" :icon="['fas', `plus-circle`]"  /> Add synth track
                </button>

                <button @click="AddTrack('microphone')" class="text-green-600 font-bold">
                    <font-awesome-icon size="lg" :icon="['fas', `plus-circle`]"  /> Add microphone track
                </button>
            </div>
            <div>
                <a class="text-gray-500 mr-2" target="_blank" href="https://github.com/daspete/juicyloops">Github</a>  
                <a class="text-gray-500" href="mailto:daspetemail@gmail.com">Contact</a>
            </div>

            
        </div>

        <div class="arranger flex-grow overflow-y-auto flex flex-col gap-1 text-white">
            <Track
                v-for="(track, trackIndex) in tracks"
                :key="`track-${ trackIndex }-${ track.id }`"
                :track="track"
                :playStep="playStep"
            />
        </div>
    </div>
</template>

<script>
import Track from '~/classes/Track'
import Sequencer from '~/classes/Sequencer'

export default {
    data(){
        return {
            isPlaying: false,
            isRecording: false,
            bpm: 136,
            tracks: [],
            playStep: -1,
            playTime: 0,
            sequenceLength: 32
        }
    },

    computed: {
        Bpm: {
            get(){
                return this.bpm
            },
            set(value){
                value = parseInt(value)
                Sequencer.Bpm = value
                this.bpm = value
            }
        },

        IsPlaying: {
            get(){
                return this.isPlaying
            },
            set(value){
                this.isPlaying = value
                if(this.isPlaying) Sequencer.play()
                if(!this.isPlaying) {
                    this.playStep = -1
                    Sequencer.pause()
                }
            }
        },
        
        IsRecording: {
            get(){
                return this.isRecording
            },
            set(value){
                this.isRecording = value
                if(this.isRecording) Sequencer.startRecording()
                if(!this.isRecording) Sequencer.stopRecording()
            }
        },
    },

    mounted(){
        Sequencer.init({
            juice: this,
            tracks: this.tracks, 
            bpm: this.bpm 
        })
    },

    methods: {
        async AddTrack(type){
            let highestTrackId = 0
            this.tracks.forEach(track => {
                if(track.id > highestTrackId){
                    highestTrackId = track.id
                }
            })

            let track = new Track({
                id: highestTrackId + 1,
                name: `Track ${ highestTrackId + 1 }`,
                muted: false,
                type: type
            })

            this.tracks.push(track)
            Sequencer.tracks = this.tracks

            await this.$nextTick()

            let arrangerTrackEl = document.querySelector('.arranger')
            if(arrangerTrackEl) arrangerTrackEl.scrollTop = arrangerTrackEl.scrollHeight
        },

        RemoveTrack(track){
            let trackToRemove = this.GetTrackById(track.id)
            if(!trackToRemove) return

            trackToRemove.destroy()
            
            this.tracks = this.tracks.filter(t => t.id !== track.id)
            Sequencer.tracks = this.tracks
        },

        GetTrackById(trackId){
            return this.tracks.find(track => track.id === trackId)
        }
    }
}
</script>

<style>

</style>