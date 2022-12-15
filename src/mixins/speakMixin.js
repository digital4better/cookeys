const synth = window.speechSynthesis

export default {
  methods: {
    mapspecialChar (value) {
      if (/^[A-ZÉ]$/.test(value)) {
        return value + ' ' + 'majuscule'
      }
      const pronunciation = new Map()
      pronunciation.set(',', 'Virgule')
      pronunciation.set('.', 'Point')
      pronunciation.set('!', "Point d'exclamation")
      pronunciation.set('?', 'Point dinterrogation')
      pronunciation.set("'", 'Apostrophe')
      pronunciation.set(':', 'Deux points')
      pronunciation.set('(', 'Parenthèse gauche')
      pronunciation.set(')', 'Parenthèse droite')
      pronunciation.set('[', 'Crochet gauche')
      pronunciation.set(']', 'Crochet droit')
      pronunciation.set('{', 'Accolade gauche')
      pronunciation.set('}', 'Accolade droite')
      pronunciation.set('"', 'Guillemet')
      pronunciation.set('-', "Trait d'union")
      pronunciation.set('è', 'E accent grave')
      pronunciation.set('ê', 'E accent circonflexe')
      pronunciation.set('ô', 'O circonflexe')
      pronunciation.set('â', 'A accent circonflexe')
      pronunciation.set('é', 'E accent aigu')
      pronunciation.set('î', 'I accent circonflexe')
      pronunciation.set('ë', 'E tréma')
      pronunciation.set('à', 'A accent grave')
      pronunciation.set(' ', 'Espace')
      if (pronunciation.has(value)) {
        return pronunciation.get(value)
      }
      return value
    },
    speak (oral) {
      if (synth.speaking && this.$store.state.oralPreview.length === 1) {
        synth.cancel()
      }
      if (oral !== '') {
        const utterThis = new SpeechSynthesisUtterance(
          this.mapspecialChar(oral)
        )
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
        this.$store.commit('updateOralPreview', oral)
      }
    },
    stopSpeech () {
      synth.cancel()
    },
    speakDelayed (oral) {
      setTimeout(() => this.speak(oral), 1100)
    }
  }
}
