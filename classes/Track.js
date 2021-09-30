import * as Tone from 'tone'
import Sequencer from './Sequencer'

export default class Track {
    constructor(params){
        this.id = params.id
        this.name = params.name
        this.muted = params.muted
        this.volume = 0
        this.pan = 0
        this.note = 2

        this.panVol = new Tone.PanVol(this.pan, this.calculateVolume(this.volume)).toDestination()
        this.synth = new Tone.Synth().connect(this.panVol)

        this.pattern = []

        for(let i = 0; i < Sequencer.sequenceLength; i++){
            this.pattern[i] = 0//i % 4 == 0 ? 1 : 0
        }
    }

    play(step, time){
        if(this.muted) return
        if(!this.synth) return
        if(this.pattern[step] === 1){
            this.synth.triggerAttackRelease(`C${ parseInt(this.note) }`, '16n', time)
        }
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