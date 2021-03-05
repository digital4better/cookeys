<template>
  <div class="landing-page">
    <div class="header">
      <h1>Apprenti Clavier</h1>
      <p>L'outil d'apprentissage de frappe au clavier</p>
    </div>
    <div class="body">
      <b-button class="controls" pill variant="primary" @click.prevent="$router.push('speech_controls')">Paramètres de lecture orale</b-button>
      <br>
      <section class=menu>
        <h3>Liste des exercices</h3>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('key_exercise')">Les touches essentielles</b-button>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('letter_exercise')">Les lettres</b-button>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('word_exercise')">Les mots</b-button>
      </section>
    </div>
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
.header {
  display: flex;
  flex-flow: wrap column;
  padding: 50px;
  align-content: flex-start;
  background: #2577f1;
  color: white;
  font-size: 30px;
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
