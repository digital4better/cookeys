<template>
<div>
  <b-card class="exercise"
    bg-variant="light"
    header-bg-variant="dark"
    header-text-variant="white"
    footer-text-variant="white"
    footer-bg-variant="dark"
    text-variant="black"
    header="Exercice 3"
    footer-tag="footer"
    title="Saisis le mot :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <section class="word">
        <span class="letter" v-for="letter in letters" :class="{current: letter.current}">{{letter.name}}</span>
      </section>
      <div><input class="input" type="text" v-model="value" @input="checkWord" :disabled="success" v-focus></div>
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
      <div v-show="isEnd">
        <p class="score">Taux de réussite : {{ score }} %</p>
        <span>Temps passé sur l'exercice :<clock ref="clock"></clock></span>
      </div>
    </template>
  </b-card>
  <b-button class="home-button" pill variant="primary" @click.prevent="backHome">Retour au menu principal</b-button>
</div>
</template>

<script>
import Clock from './clock.vue'

var synth = window.speechSynthesis

export default {
  components: { Clock },
  data () {
    return {
      word: '',
      letters: [],
      current: '',
      value: '',
      words: ['apprenti', 'clavier'],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      wordErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  mounted: function () {
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
    startWatch () {
      this.$refs.clock.start()
    },
    stopWatch () {
      this.$refs.clock.stop()
    },
    resetWatch () {
      this.$refs.clock.reset()
    },
    checkWord (e) {
      // choix a demander à bernadette : je laisse orca dire les touches, je ne les dit pas avec l'application
      // this.speak(e.key)
      
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
        } else {
          this.stopWatch()
        }
      }
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
    },
    speak (oral) {
      if (synth.speaking) {
        synth.cancel()
      }
      if (oral !== '' && oral !== null) {
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
    backHome () {
      this.$router.push('/')
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  beforeRouteLeave (to, from , next) {
    this.resetWatch()
    next()
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
justify-content: flex-start;
align-content: space-between;
flex-flow: wrap column;
}

.letter {
visibility: aria-hidden;
font-size: 80px;
background: rgba(0, 0, 0, 0.003);
white-space: nowrap;
}

.letter.current {
  background-color: #2577f1;
}

.input{
visibility: aria-hidden;
font-size: 80px;
margin: 16px 16px 16px 0px
}

.home-button{
  margin: 1em;
}

</style>
