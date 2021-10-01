import * as Tone from 'tone'
const Sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))
class Sequencer {
    constructor(){
        this.bpm = 136
        this.tracks = []
        this.sequence = null
        this.sequenceLength = 64
        this.sequencePattern = []
        this.stepLength = 1

        this.audioContext = Tone.context
        this.audioStream = this.audioContext.createMediaStreamDestination()
        this.recorder = null
        this.recordedChunks = []

        for(let i = 0; i < this.sequenceLength; i++){
            this.sequencePattern.push(i)
        }

        this.isPlaying = false
    }

    get Bpm(){ 
        return this.bpm 
    }
    set Bpm(bpm){ 
        Tone.Transport.bpm.value = bpm
        this.bpm = bpm 
    }

    init(params){
        this.tracks = params.tracks
        this.Bpm = params.bpm
        this.juice = params.juice
        this.juice.sequenceLength = this.sequenceLength

        this.sequence = new Tone.Sequence(
            (time, step) => {
                this.juice.playStep = step
                this.tracks.forEach(track => {
                    track.play(step, time)
                })
            },
            this.sequencePattern,
            "16n"
        ).start(0)
    }

    play(){
        if(this.isPlaying) return
        this.isPlaying = true

        Tone.Transport.start()
    }

    pause(){
        if(!this.isPlaying) return
        this.isPlaying = false

        Tone.Transport.stop()
    }

    startRecording(){
        this.recordedChunks = []

        this.recorder = new MediaRecorder(this.audioStream.stream)
        this.recorder.ondataavailable = (chunk) => {
            this.recordedChunks.push(chunk.data)
        }
        this.recorder.start()
    }

    stopRecording(){
        if(!this.recorder) return
        
        this.recorder.onstop = () => {
            let blob = new Blob(this.recordedChunks, { type: 'audio/wav' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'juicyrecording.wav'
            link.click()
        }
        this.recorder.stop()


    }
    
}

const sequencer = new Sequencer()

export default sequencer