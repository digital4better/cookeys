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
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('punctuation_exercise')">Exercice 9 : La ponctuation</b-button>
        <br>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('letter_exercise')">Exercice 5 : Toutes les lettres</b-button>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('accent_exercise')">Exercice 6 : Les accents</b-button>
        <br>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('word_exercise')">Exercice 7 : Les mots courts</b-button>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('long_word_exercise')">Exercice 8 : Plus de mots</b-button>
        <br>
        <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('sentence_exercise')">Exercice 10 : Les phrases</b-button>
      </section>
    </div>
  </div>
</template>

<script>
import SpeechControls from './speech_controls.vue'

export default {
  components: { SpeechControls },
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
