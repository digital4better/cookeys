<template>
<div>
  <b-card
    class="exercise"
    g-variant="light"
    header-bg-variant="dark"
    header-text-variant="white"
    footer-text-variant="white"
    footer-bg-variant="dark"
    text-variant="black"
    header="Exercice 1"
    footer-tag="footer"
    title="Appuie sur la touche :"
    style="font-family: 'Tiresias Infofont', arial"
  >
    <link
      href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont"
      rel="stylesheet"
      type="text/css"
    />

    <section class="body">
      <div>
        <span class="key"> {{ key.name }}</span>
      </div>
      <div>
        <input
          class="input"
          type="text"
          v-model="value"
          @keyup="checkKey"
          :disabled="success"
          v-focus
        />
      </div>
      <div>
        <p v-if="error" class="is-error">
          Oups, tu t'es trompé(e) de touche, réessaie !
        </p>
      </div>
      <div v-if="success">
        <p class="is-success">Bravo !</p>
      </div>
    </section>
    <template #footer>
      <div>
        <p class="errors-count" v-show="hasMadeOneError">
          <strong>{{ keyErrors }}</strong> erreur a été commise pour la touche
          <strong>{{ key.name }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ keyErrors }}</strong> erreurs ont été commises pour la
          touche <strong>{{ key.name }}</strong>
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

import Clock from "./clock.vue"

var synth = window.speechSynthesis

export default {
  components: { Clock },
  data() {
    return {
      key: "",
      value: "",
      keys: [
        {
          keyCode: 18,
          name: "Alt",
        },
        {
          keyCode: 16,
          name: "Shift",
        },
        {
          keyCode: 13,
          name: "Entrée",
        },
        {
          keyCode: 17,
          name: "Control",
        },
      ],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      keyErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0, // pourcentage de réussite
    }
  },
  mounted: function () {
    this.initKey()
    this.startWatch()
  },
  computed: {
    hasMadeErrors() {
      return this.keyErrors > 1
    },
    hasMadeOneError() {
      return this.keyErrors === 1
    },
    isEnd() {
      return this.keys.length === 0 && this.success === true
    },
  },
  methods: {
    startWatch() {
      this.$refs.clock.start()
    },
    stopWatch() {
      this.$refs.clock.stop()
    },
    resetWatch() {
      this.$refs.clock.reset()
    },
    checkKey(e) {
      // choix a demander à bernadette : je laisse orca dire les touches, je ne les dit pas avec l'application
      // this.speak(e.key)
      this.attempts++
      if (e.keyCode !== this.key.keyCode) {
        this.error = true
        e.target.value = ""
        this.keyErrors++
        this.totalErrors++
      } else {
        this.error = false
        this.success = true
        if (this.keys.length !== 0) {
          this.changeKey(e)
        } else {
          this.stopWatch()
        }
      }
      this.value = e.target.value
      this.score = (
        ((this.attempts - this.totalErrors) / this.attempts) *
        100
      ).toFixed(0)
    },
    initKey() {
      if (this.keys.length > 0) {
        this.key = this.keys.shift()
      }
      this.speak(this.key.name)
    },
    changeKey(e) {
      this.keyErrors = 0
      e.target.value = ""
      this.value = ""
      if (this.keys.length > 0) {
        this.key = this.keys.shift()
        this.speak("touche suivante :" + this.key.name)
      }
      this.success = false
      this.error = false
    },
    async speak(oral) {
      if (synth.speaking) {
        synth.cancel()
      }
      if (oral !== "") {
        const utterThis = new SpeechSynthesisUtterance(oral)
        utterThis.onend = function (event) {
          console.log("SpeechSynthesisUtterance.onend")
        }
        utterThis.onerror = function (event) {
          console.error("SpeechSynthesisUtterance.onerror")
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
      },
    },
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
  flex-flow: wrap column;
  justify-content: flex-start;
  align-content: space-between;
}

.key {
  visibility: aria-hidden;
  font-size: 80px;
  background: rgba(0, 0, 0, 0.003);
}

.input {
  visibility: aria-hidden;
  font-size: 80px;
  margin: 16px 16px 16px 0px;
}

.home-button{
  margin: 1em;
}

</style>
