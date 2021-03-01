<template>
  <b-card class="exercise"
    bg-variant="secondary"
    header-bg-variant="dark"
    footer-bg-variant="dark"
    text-variant="white"
    header="Exercice 1"
    footer-tag="footer"
    title="Appuie sur la touche :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <div><span class="letter"> {{ entry }}</span></div>
      <div><input class="input" type="text" v-model="value" @input="speakInput" @keyup="checkLetter" :disabled="success" v-focus></div>
      <div>
        <p v-if="error" class="is-error">Oups, tu t'es trompé(e) de touche, réessaie !</p>
      </div>
      <div v-if="success">
        <span class="is-success">Bravo !</span>
      </div>
    </section>
    <template #footer>
      <div>
        <p class="errors-count" v-show="hasMadeOneError">
          <strong>{{ countErrors }}</strong> erreur a été commise pour la lettre <strong>{{ entry }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ countErrors }}</strong> erreurs ont été commises pour la lettre <strong>{{ entry }}</strong>
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
      entry: '',
      value: '',
      letters: ['a', 'b'],
      count: 0, // nb total d'essais
      error: false,
      success: false,
      countErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  mounted: function () {
    this.initLetter()
    // this.changeLetter()
    // this.speakInstructions(this.consignes) // method1 will execute at pageload
  },
  computed: {
    hasMadeErrors () {
      return (this.countErrors > 1)
    },
    hasMadeOneError () {
      return (this.countErrors === 1)
    },
    isEnd () {
      return (this.letters.length === 0 && this.success === true)
    }
  },
  methods: {
    checkLetter (e) {
      this.count++
      if (this.value !== this.entry) {
        this.error = true
        e.target.value = ''
        this.countErrors++
        this.totalErrors++
        this.value = e.target.value
      } else {
        this.error = false
        this.success = true
        this.value = e.target.value
        if (this.letters.length !== 0) {
          this.changeLetter(e)
        }
      }
      this.score = (((this.count - this.totalErrors) / this.count) * 100).toFixed(0)
    },
    initLetter () {
      if (this.letters.length > 0) {
        this.entry = this.letters.shift()
      }
      // this.speakInstructions(this.entry)
    },
    changeLetter (e) {
      this.countErrors = 0
      e.target.value = ''
      this.value = ''
      if (this.letters.length > 0) {
        this.entry = this.letters.shift()
      }
      this.success = false
      this.error = false
      this.speakInstructions(this.entry)
    },
    speakInput (e) {
      if (synth.speaking) {
        console.error('speechSynthesis.speaking')
        return
      }
      console.log(e)
      var oral = e.target.value
      if (oral !== '') {
        var utterThis = new SpeechSynthesisUtterance()
        utterThis.text = oral
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend')
        }
        utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror')
        }
        utterThis.voice = voices[0]
        synth.speak(utterThis)
      }
    },
    speakInstructions (oral) {
      if (synth.speaking) {
        console.error('speechSynthesis.speaking')
        return
      }
      if (oral !== '') {
        const utterThis = new SpeechSynthesisUtterance()
        utterThis.text = oral
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
