<template>
<div>
  <b-card class="exercise"
    bg-variant="light"
    header-bg-variant="dark"
    header-text-variant="white"
    footer-text-variant="white"
    footer-bg-variant="dark"
    text-variant="black"
    header="Exercice 6"
    footer-tag="footer"
    title="Saisis le caractère :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <div><span class="letter"> {{ letter }}</span></div>
      <div><input class="input" type="text" v-model="value" @input="checkLetter" :disabled="success" aria-hidden="true" v-focus></div>
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
      <div v-show="isEnd">
        <p class="score">Taux de réussite : {{ score }} %</p>
        <span>Temps passé sur l'exercice :<clock ref="clock"></clock></span>
      </div>
    </template>
  </b-card>
  <b-button class="home-button" pill variant="primary" @click.prevent="$router.push('/')">Retour au menu principal</b-button>
</div>
</template>

<script>

import Clock from './clock.vue'
import speakMixin from '../mixins/speakMixin'

export default {
  components: { Clock },
  mixins: [speakMixin],
  data () {
    return {
      letter: '',
      value: '',
      letters: ['ê', 'é', 'è', 'à', 'ö'],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      letterErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  mounted: function () {
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
    startWatch () {
      this.$refs.clock.start()
    },
    stopWatch () {
      this.$refs.clock.stop()
    },
    resetWatch() {
      this.$refs.clock.reset()
    },
    checkLetter (e) {
      // choix a demander à bernadette : je laisse orca dire les touches, je ne les dit pas avec l'application
      // this.speak(e.key)
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
        } else {
          this.stopWatch()
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
        setTimeout(() => this.speak(this.letter), 600)
      }
      this.success = false
      this.error = false
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

<style scoped>

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
