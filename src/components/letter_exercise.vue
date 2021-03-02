<template>
  <b-card class="exercise"
    bg-variant="secondary"
    header-bg-variant="dark"
    footer-bg-variant="dark"
    text-variant="white"
    header="Exercice 1"
    footer-tag="footer"
    title="Saisis la lettre :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <div><span class="letter"> {{ letter }}</span></div>
      <div><input class="input" type="text" v-model="value" @keyup="checkLetter" :disabled="success" v-focus></div>
      <div>
        <p v-if="error" class="is-error">Oups, tu t'es trompé(e) de lettre, réessaie !</p>
      </div>
      <div v-if="success">
        <span class="is-success">Bravo !</span>
      </div>
    </section>
    <template #footer>
      <div>
        <p class="errors-count" v-show="hasMadeOneError">
          <strong>{{ letterErrors }}</strong> erreur a été commise pour la lettre <strong>{{ letter }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ letterErrors }}</strong> erreurs ont été commises pour la lettre <strong>{{ letter }}</strong>
        </p>
      </div>
      <div><p class="score" v-show="isEnd">Taux de réussite : {{ score }} %</p></div>
    </template>
  </b-card>
</template>

<script>

var synth = window.speechSynthesis

var voices = []

export default {
  components: {},
  data () {
    return {
      letter: '',
      value: '',
      letters: ['a', 'b', 'c', 'd', 'e'],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      letterErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  mounted: function () {
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
    checkLetter (e) {
      this.speak(e.key)
      this.attempts++
      if (this.value !== this.letter) {
        this.error = true
        e.target.value = ''
        this.letterErrors++
        this.totalErrors++
      } else {
        this.error = false
        this.success = true
        if (this.letters.length !== 0) {
          this.changeLetter(e)
        }
      }
      this.value = e.target.value
      this.score = (((this.attempts - this.totalErrors) / this.attempts) * 100).toFixed(0)
    },
    initLetter () {
      if (this.letters.length > 0) {
        this.letter = this.letters.shift()
      }
      this.speak(this.letter)
    },
    changeLetter (e) {
      this.letterErrors = 0
      e.target.value = ''
      this.value = ''
      if (this.letters.length > 0) {
        this.letter = this.letters.shift()
        this.speak('lettre suivante :' + this.letter)
      }
      this.success = false
      this.error = false
    },
    async speak (oral) {
      if (synth.speaking) {
        console.error('speechSynthesis.speaking')
        await this.$nextTick()
      }
      if (oral !== '') {
        const utterThis = new SpeechSynthesisUtterance(oral)
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend')
        }
        utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror')
        }
        utterThis.voice = voices[0]
        synth.speak(utterThis)
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
<style>

.errors-count {
text-align: left;
}

.errors-count strong {
font-weight: 600;
}

.body {
display: flex;
flex-flow: wrap column;
justify-content: flex-start;
align-content: space-between;
}

.letter {
visibility: aria-hidden;
font-size: 80px;
background: rgba(0, 0, 0, 0.003);
}

.input{
visibility: aria-hidden;
font-size: 80px;
margin: 16px 16px 16px 0px
}
</style>
