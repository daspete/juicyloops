import * as Tone from 'tone'
import Sequencer from './Sequencer'

export default class Track {
    constructor(params){
        this.type = params.type
        this.id = params.id
        this.name = params.name
        this.muted = params.muted
        this.volume = 0
        this.pan = 0
        this.note = 2
        this.tune = 2
        this.octave = 2
        this.length = 6

        this.panVol = new Tone.PanVol(this.pan, this.calculateVolume(this.volume)).toDestination()
        
        if(this.type == 'synth'){
            this.synth = new Tone.Synth().connect(this.panVol)
        }

        if(this.type == 'microphone'){
            this.isRecording = false
            this.recordedData = null
            this.recorder = new Tone.Recorder()
            this.microphone = new Tone.UserMedia()

            this.microphone.connect(this.recorder)
            this.microphone.open()

            this.player = null
        }

        this.availableNotes = ['C','D','E','F','G','A','B']
        this.availableTunes = ['bb', 'b', '', '#', 'x']
        this.availableOctaves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        this.availableLengths = ['1m', '1n', '1n.', '2n', '2n.', '2t', '4n', '4n.', '4t', '8n', '8n.', '8t', '16n', '16n.', '16t', '32n', '32n.', '32t', '64n', '64n.', '64t', '128n', '128n.', '128t', '256n', '256n.', '256t']
        this.availableLengths.reverse()

        this.pattern = []
        for(let i = 0; i < Sequencer.sequenceLength; i++){
            this.pattern[i] = {
                active: false,
                note: 2,
                tune: 2,
                octave: 2,
                length: 6
            }
        }
    }

    play(step, time){
        if(this.muted) return
        if(this.pattern[step].active){
            this.playSound(time)   
        }
    }

    playSound(startTime){
        if(this.type == 'synth'){
            if(!this.synth) return

            this.synth.triggerAttackRelease(
                `${ this.availableNotes[parseInt(this.note)] }${ this.availableTunes[parseInt(this.tune)] }${ this.availableOctaves[parseInt(this.octave)] }`, 
                this.availableLengths[this.length], 
                startTime
            )
        }

        if(this.type == 'microphone'){
            if(!this.player) return
            this.player.start(startTime)
        }
    }

    startMicrophoneRecording(){
        this.isRecording = true
        this.recorder.start()
    }

    async stopMicrophoneRecording(){
        this.isRecording = false
        let data = await this.recorder.stop()
        this.recordedData = URL.createObjectURL(data)
        console.log(this.recordedData)
        this.player = new Tone.Player(this.recordedData).connect(this.panVol)
        console.log(this.player)
    }

    destroy(){
        this.synth = null
        console.log(`${ this.name } destroyed`)
    }


    setMuted(muted){
        this.muted = muted
    }

    setNote(note){
        this.note = note
    }

    setTune(tune){
        this.tune = tune
    }

    setOctave(octave){
        this.octave = octave
    }

    setLength(length){
        this.length = length
    }

    setVolume(volume){
        this.volume = volume
        this.panVol.volume.value = this.calculateVolume(this.volume)
    }

    setPan(pan){
        this.pan = pan
        this.panVol.pan.value = this.pan
    }

    setName(name){
        this.name = name
    }

    calculateVolume(volume){
        return volume//-40 * (1 - volume)
    }
}