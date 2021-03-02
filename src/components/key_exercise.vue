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
      <div><span class="key"> {{ key }}</span></div>
      <div><input class="input" type="text" v-model="value" @keyup="checkKey" :disabled="success" v-focus></div>
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
          <strong>{{ keyErrors }}</strong> erreur a été commise pour la touche <strong>{{ key }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ keyErrors }}</strong> erreurs ont été commises pour la touche <strong>{{ key }}</strong>
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
      key: '',
      value: '',
      keys: ['Enter', 'Espace', 'Echap', 'Verrouillage Majuscule', 'Verrouillage Num'],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      keyErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  mounted: function () {
    this.initKey()
  },
  computed: {
    hasMadeErrors () {
      return (this.keyErrors > 1)
    },
    hasMadeOneError () {
      return (this.keyErrors === 1)
    },
    isEnd () {
      return (this.keys.length === 0 && this.success === true)
    }
  },
  methods: {
    checkKey (e) {
      console.log(e)
      this.speak(e.key)
      this.attempts++
      if (e.key !== this.key) {
        this.error = true
        e.target.value = ''
        this.keyErrors++
        this.totalErrors++
        this.value = e.target.value
      } else {
        this.error = false
        this.success = true
        this.value = e.target.value
        if (this.keys.length !== 0) {
          this.changeKey(e)
        }
      }
      this.score = (((this.attempts - this.totalErrors) / this.attempts) * 100).toFixed(0)
    },
    initKey () {
      if (this.keys.length > 0) {
        this.key = this.keys.shift()
      }
      this.speak(this.key)
    },
    changeKey (e) {
      this.keyErrors = 0
      e.target.value = ''
      this.value = ''
      if (this.keys.length > 0) {
        this.key = this.keys.shift()
        this.speak('touche suivante :' + this.key)
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

.key {
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
