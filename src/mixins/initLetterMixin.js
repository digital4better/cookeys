export default {
  methods: {
    initLetter () {
      if (this.letters.length > 0) {
        this.letter = this.letters.shift()
      }
      setTimeout(() => this.speak(this.letter), 1500)
    }
  }
}