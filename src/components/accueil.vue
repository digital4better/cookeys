<template>
  <div>
    <header class="header">
      <h1>Accueil</h1>
    </header>
    <section class="landing-page">
      <section class=menu>
        <b-button class="button" pill variant="secondary" @click.prevent="$router.push('key_exercise')">Les touches essentielles</b-button>
        <b-button class="button" pill variant="secondary" @click.prevent="$router.push('letter_exercise')">Les lettres</b-button>
        <b-button class="button" pill variant="secondary" @click.prevent="$router.push('word_exercise')">Les mots</b-button>
      </section>
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
.menu{
  display: flex;
  flex-flow: wrap column;
}
.header{
  display: flex;
  justify-content: flex-start;
}
.button{
  text-align: start;
  width: 500 px;
  font-size: 25 px;
}
.landing-page{
  display: flex;
  flex-flow: wrap row;
  align-content: space-between;
}
</style>
