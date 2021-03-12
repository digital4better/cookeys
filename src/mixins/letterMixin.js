export default {
  mounted: function () {
    this.initContent()
    this.speak(this.consigne)
    this.startWatch()
    this.initLetter()
  },
  computed: {
    hasMadeErrors () {
      return (this.letterErrors > 1)
    },
    hasMadeOneError () {
      return (this.letterErrors === 1)
    },
    isEnd () {
      return (this.letters.length === 0 && this.success === true)
    }
  },
  methods: {
    initLetter () {
      if (this.letters.length > 0) {
        this.letter = this.letters.shift()
      }
      setTimeout(() => this.speak(this.letter), 3000)
    },
    changeLetter (e) {
      this.letterErrors = 0
      e.target.value = ''
      this.value = ''
      if (this.letters.length > 0) {
        this.letter = this.letters.shift()
        setTimeout(() => this.speak(this.letter), 600)
      }
      this.success = false
      this.error = false
    },
    checkLetter (e) {
      console.log(e)
      this.attempts++
      if (this.value !== this.letter) {
        this.error = true
        console.log(e.target.value)
        e.target.value = ''
        console.log(e.target.value)
        this.letterErrors++
        this.totalErrors++
      } else {
        this.error = false
        this.success = true
        if (this.letters.length !== 0) {
          this.changeLetter(e)
        } else {
          this.congrat()
          this.stopWatch()
        }
      }
      this.value = e.target.value
      this.score = (((this.attempts - this.totalErrors) / this.attempts) * 100).toFixed(0)
    }
  }
}
