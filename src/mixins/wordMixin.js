export default {
  data () {
    return {
      consigne: 'Saisis au clavier :',
      word: '',
      cursor: 0,
      value: '',
      previousValue: '',
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      wordErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      currentLetter: ''
    }
  },
  mounted: function () {
    this.speak(this.consigne)
    this.initWord()
    this.startWatch()
  },
  computed: {
    letters () {
      return this.word.split('')
    },
    hasMadeErrors () {
      return this.wordErrors > 1
    },
    hasMadeOneError () {
      return this.wordErrors === 1
    },
    isEnd () {
      return this.words.length === 0 && this.success === true
    },
    score () {
      return (
        ((this.attempts - this.totalErrors) / this.attempts) *
        100
      ).toFixed(0)
    }
  },
  methods: {
    checkWord (e) {
      if (this.cursor > this.value.length) {
        this.value = this.previousValue
        return
      }
      this.attempts++
      this.currentLetter = this.word[this.cursor]
      if (this.value[this.cursor] === this.currentLetter) {
        this.cursor++
        this.previousValue = this.value
      } else {
        this.value = this.previousValue
        this.error = true
        this.wordErrors++
        this.totalErrors++
      }
      this.speakDelayed(this.word[this.cursor])
      if (this.value === this.word) {
        this.error = false
        this.success = true
        if (this.words.length !== 0) {
          this.changeWord()
        } else {
          this.congrat()
          this.stopWatch()
        }
      }
    },
    changeWord () {
      this.nextWord()
      setTimeout(() => this.speak(this.word), 3000)
      setTimeout(() => this.speak(this.word[0]), 4000)
    },
    initWord () {
      this.nextWord()
      setTimeout(() => this.speak(this.word), 3500)
      setTimeout(() => this.speak(this.word[0]), 5000)
    },
    nextWord () {
      this.wordErrors = 0
      if (this.words.length > 0) {
        this.word = this.words.shift()
      }
      this.success = false
      this.error = false
      this.cursor = 0
      this.previousValue = this.value = ''
    }
  }
}
