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
        <section class="keys">
          <h3>Repérer les touches</h3>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('key_exercise')">Exercice 1 : Les touches essentielles</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('letter_exercise')">Exercice 2 : Les lettres</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('punctuation_exercise')">Exercice 3 : La ponctuation</b-button>
        </section>
        <section class="words">
          <h3>Écrire des mots</h3>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('right_hand_word_exercise')">Exercice 4 : Se servir de la main droite</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('left_hand_word_exercise')">Exercice 5 : Se servir de la main gauche</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('both_hands_word_exercise')">Exercice 6 : Se servir des deux mains</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('punctuation_word_exercise')">Exercice 7 : Les mots et la ponctuation</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('accent_word_exercise')">Exercice 8 : Les mots avec accents</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('capital_letters_accent_word_exercise')">Exercice 9 : Les mots avec accents et majuscules</b-button>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('special_characters_word_exercise')">Exercice 10 : Des mots et des caractères spéciaux</b-button>
        </section>
        <section class="further">
          <h3>Pour aller plus loin</h3>
          <b-button class="button btn-lg btn-block" pill variant="dark" @click.prevent="$router.push('sentence_exercise')">Exercice 11 : Les phrases</b-button>
        </section>
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
  flex-flow: wrap row;
  justify-content: space-around;
}
.keys .words .further {
  display: flex;
  flex-flow: wrap column;
  justify-self: center;
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
