const synth = window.speechSynthesis

export default {
  methods: {
    mapspecialChar (value) {
      if (/^[A-ZÉ]$/.test(value)) {
        return value + ' ' + 'majuscule'
      }
      switch (value) {
        case ',':
          return 'Virgule'
        case '.':
          return 'Point'
        case '!':
          return "Point d'exclamation"
        case '?':
          return "Point d'interrogation"
        case "'":
          return 'Apostrophe'
        case ' ':
          return 'Espace'
        case ':':
          return 'Deux points'
        case ';':
          return 'Point virgule'
        case '-':
          return "Trait d'union"
        case '(':
          return 'Parenthèse gauche'
        case ')':
          return 'Parenthèse droite'
        case '[':
          return 'crochet gauche'
        case ']':
          return 'Crochet droit'
        case '{':
          return 'Accolade gauche'
        case '}':
          return 'Accolade droite'
        case '"':
          return 'Guillemet'
        case 'è':
          return 'E accent grave'
        case 'ê':
          return 'E accent circonflexe'
        case 'ô':
          return 'O accent circonflexe'
        case 'â':
          return 'A accent grave'
        case 'é':
          return 'E accent aigu'
        case 'Î':
          return 'I accent circonflexe'
        case 'ë':
          return 'E tréma'
        case 'à':
          return 'A accent grave'
        case 'ç':
          return 'C cédille'

        default:
          return value
      }
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
