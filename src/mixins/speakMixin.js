const synth = window.speechSynthesis

export default {
  mounted: function () {
    this.initSpecialCharPronunciation()
  },
  data () {
    return {
      pronunciation: new Map()
    }
  },
  methods: {
    mapspecialChar (value) {
      if (/^[A-ZÉ]$/.test(value)) {
        return value + ' majuscule'
      }
      if (this.pronunciation.has(value)) {
        return this.pronunciation.get(value)
      }
      return value
    },
    initSpecialCharPronunciation () {
      this.pronunciation.set(',', 'Virgule')
      this.pronunciation.set('.', 'Point')
      this.pronunciation.set('!', "Point d'exclamation")
      this.pronunciation.set('?', "Point d'interrogation")
      this.pronunciation.set("'", 'Apostrophe')
      this.pronunciation.set(':', 'Deux points')
      this.pronunciation.set('(', 'Parenthèse gauche')
      this.pronunciation.set(')', 'Parenthèse droite')
      this.pronunciation.set('[', 'Crochet gauche')
      this.pronunciation.set(']', 'Crochet droit')
      this.pronunciation.set('{', 'Accolade gauche')
      this.pronunciation.set('}', 'Accolade droite')
      this.pronunciation.set('"', 'Guillemet')
      this.pronunciation.set('-', "Trait d'union")
      this.pronunciation.set('è', 'E accent grave')
      this.pronunciation.set('ê', 'E accent circonflexe')
      this.pronunciation.set('ô', 'O accent circonflexe')
      this.pronunciation.set('â', 'A accent circonflexe')
      this.pronunciation.set('é', 'E accent aigu')
      this.pronunciation.set('î', 'I accent circonflexe')
      this.pronunciation.set('ë', 'E tréma')
      this.pronunciation.set('à', 'A accent grave')
      this.pronunciation.set(' ', 'Espace')
      this.pronunciation.set('ç', 'C cédille')
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
