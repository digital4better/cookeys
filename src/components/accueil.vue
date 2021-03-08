<template>
  <div class="landing-page">
    <div class="header">
      <div class="title">
        <h1>Apprenti Clavier</h1>
        <p>Outil d'apprentissage de la frappe au clavier</p>
      </div>
      <div class="instructions">
        <p>Parcourez les exercices en utilisant la touche Tab.</p>
        <p>Pour entrer dans un exercice, appuyez sur la touche Entrée.</p>
      </div>
    </div>
    <div class="body">
      <b-button class="controls" pill variant="primary" @click.prevent="$router.push('speech_controls')">Paramètres de lecture orale</b-button>
      <br>
      <section class=menu>
        <h3>Liste des exercices</h3>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('key_exercise')">Exercice 1 : Les touches essentielles</b-button>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('letter_exercise')">Exercice 2 : Les lettres</b-button>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('word_exercise')">Exercice 3 : Les mots</b-button>
      </section>
    </div>
  </div>
</template>

<script>
import SpeechControls from './speech_controls.vue'

/* var synth = window.speechSynthesis
var voices = []
var pitch = 1
var rate = 1 */

export default {
  components: { SpeechControls },
  data () {
    return {
      // choix à demander à bernadette : je laisse ORCA lire les consignes (s'il peut ?) et je ne les lis pas avec l'application
      // consignes: 'Bienvenue dans : apprenti clavier, un outil dapprentissage de frappe au clavier. Pour parcourir les exercices, utilise la touche Tab. Pour rentrer dans un exercice, appuie sur Entrée.'
    }
  },
  mounted: function () {
    // this.speak(this.consignes)
  },
  methods: {
    /* speak (oral) {
      if (synth.speaking) {
        synth.cancel()
      }
      var utterThis = new SpeechSynthesisUtterance(oral)
      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend')
      }
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror')
      }
      utterThis.voice = voices[0]
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === voiceselect) {
          utterThis.voice = voices[i]
          break
        }
      }
      this.$store.commit('updatePitch', pitch)
      this.$store.commit('updateRate', rate)
      this.$store.commit('updateVoice', utterThis.voice)
      utterThis.pitch = pitch
      utterThis.rate = rate
      synth.speak(utterThis)
    } */
  }
}
</script>

<style scoped>

.title {
  display: flex;
  flex-flow: wrap column;
}

.header {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
  padding: 50px;
  background: #2577f1;
  color: white;
  font-size: 20px;
}

.instructions{
  display: flex;
  flex-flow: wrap column;
  justify-content: flex-start;
}

.menu{
  display: flex;
  flex-flow: wrap column;
  align-content: flex-start;
}

.body{
  margin: 1em;
}

.button{
  text-align: start;
}
.landing-page{
  display: flex;
  flex-flow: wrap column;
}
.controls{
  display: flex;
  text-align: start;
  align-self: flex-start;
}
</style>
