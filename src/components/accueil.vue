<template>
  <div>
    <h1 class="header">
      Accueil
    </h1>
    <section class="landing-page">
      <section class=menu>
        <b-button class="button" pill variant="secondary" @click.prevent="$router.push('key_exercise')">Les touches essentielles</b-button>
        <b-button class="button" pill variant="secondary" @click.prevent="$router.push('letter_exercise')">Les lettres</b-button>
        <b-button class="button" pill variant="secondary" @click.prevent="$router.push('word_exercise')">Les mots</b-button>
      </section>
      <b-button class="controls" pill variant="primary" @click.prevent="$router.push('speech_controls')">Paramètres de lecture orale</b-button>
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

.button{
  text-align: start;
  width: 500 px;
  font-size: 25 px;
}
.landing-page{
  display: flex;
  flex-flow: wrap column;
  align-content: space-between;
  align-items: flex-start;
}
.controls{
  display: flex;
  align-self: flex-end;
}
</style>
