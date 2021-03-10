var synth = window.speechSynthesis

export default {
  methods: {
    speak (oral) {
      if (synth.speaking) {
        synth.cancel()
      }
      if (oral !== '') {
        const utterThis = new SpeechSynthesisUtterance(oral)
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend')
        }
        utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror')
        }
        utterThis.voice = this.$store.state.voice
        utterThis.pitch = this.$store.state.pitch
        utterThis.rate = this.$store.state.rate
        synth.speak(utterThis)
      }
    },
    stopSpeech () {
      synth.cancel()
    },
    speakDelayed (oral) {
      setTimeout(() => this.speak(oral), 600)
    }
  }
}