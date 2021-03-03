<template>
  <div>
    <section class="landing-page">
      <header class="header">
        <h1>Accueil</h1>
      </header>
      <router-link to="/key_exercise" tag="b-button">Exercice 1 : Les touches essentielles</router-link>
      <router-link to="/letter_exercise" tag="b-button">Exercice 2 : La frappe des lettres</router-link>
      <router-link to="/word_exercise" tag="b-button">Exercice 3 : Mots et phrases</router-link>
      <speech-controls></speech-controls>
    </section>
  </div>
</template>

<script>
import SpeechControls from './speech_controls.vue'

export default {
  components: { SpeechControls },
  data () {
    return {
      text: ''
    }
  },
  methods: {
  },

  computed: {
  }
}
</script>

<style scoped>
.landing-page{
  display: flex;
  flex-flow: wrap column;
}
</style>
