export default {
  mounted: function () {
    this.speak(this.consigne)
    this.changeWord()
    this.startWatch()
  },
  computed: {
    hasMadeErrors () {
      return (this.wordErrors > 1)
    },
    hasMadeOneError () {
      return (this.wordErrors === 1)
    },
    isEnd () {
      return (this.words.length === 0 && this.success === true)
    }
  },
  methods: {
    checkWord (e) {
      this.attempts++
      for (var i = 0; i < this.letters.length; i++) {
        this.letters[i].current = false
      }
      if (this.value === '') this.letters[0].current = true
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] === this.letters[i].name) {
          this.letters[i].current = false
          if (i !== this.word.length - 1) {
            this.letters[i+1].current = true
          }
        } else {
          this.error = true
          if (this.incorrect_previous_letter) return
          this.incorrect_previous_letter = true
          this.wordErrors++
          this.totalErrors++
          return
        } 
      }
      if (this.value === this.word) {
        this.error = false
        this.success = true
        e.target.value = ''
        this.value = e.target.value
        if (this.words.length !== 0) {
          this.changeWord(e)
        } else {
          this.stopWatch()
        }
      }
      this.incorrect_previous_letter = false
      this.score = (((this.attempts - this.totalErrors) / this.attempts) * 100).toFixed(0)
    },
    spell () {
      for (var i = 0; i < this.word.length; i++) {
        this.letters.push({
          name: this.word.charAt(i),
          current: false
        })
      }
      this.letters[0].current = true
    },
    changeWord (e) {
      this.wordErrors = 0
      this.letters = []
      if (this.words.length > 0) {
        this.word = this.words.shift()
        this.spell()
      }
      this.success = false
      this.error = false
      var consigne = this.word + '.'
      for (var i = 0; i < this.letters.length; i++) {
        consigne += this.letters[i].name + '.'
      }
      this.speak(consigne)
    }
  }
}