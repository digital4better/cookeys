<template>
  <b-card class="exercise"
    bg-variant="secondary"
    header-bg-variant="dark"
    footer-bg-variant="dark"
    text-variant="white"
    header="Exercice 2"
    footer-tag="footer"
    title="Saisis le mot :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <div><span class="word"> {{ word }}</span></div>
      <div><input class="input" type="text" v-model="value" @input="speakInput" @keyup="checkWord" :disabled="success" v-focus></div>
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
          <strong>{{ wordErrors }}</strong> erreur a été commise pour le mot <strong>{{ word }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ wordErrors }}</strong> erreurs ont été commises pour le mot <strong>{{ word }}</strong>
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
      word: '',
      value: '',
      words: ['chat', 'jus'],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      wordErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  mounted: function () {
    this.initWord()
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
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] !== this.word[i]) {
          this.error = true
          this.wordErrors++
          this.totalErrors++
        }
      }
      if (this.value === this.word) {
        this.error = false
        this.success = true
        e.target.value = ''
        this.value = e.target.value
        if (this.words.length !== 0) {
          this.changeWord(e)
        }
      }
      this.score = (((this.attempts - this.totalErrors) / this.attempts) * 100).toFixed(0)
    },
    initWord () {
      if (this.words.length > 0) {
        this.word = this.words.shift()
      }
      this.speak(this.word)
    },
    changeWord (e) {
      this.wordErrors = 0
      if (this.words.length > 0) {
        this.word = this.words.shift()
      }
      this.success = false
      this.error = false
      this.speak(this.word)
    },
    speakInput (e) {
      console.log(e)
      var oral = e.data
      this.speak(oral)
    },
    async speak (oral) {
      if (synth.speaking) {
        console.error('speechSynthesis.speaking')
        await this.$nextTick()
      }
      if (oral !== '' && oral !== null) {
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

.word {
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
