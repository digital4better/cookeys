<template>
<div>
  <b-card class="exercise"
    bg-variant="light"
    header-bg-variant="dark"
    header-text-variant="white"
    footer-text-variant="white"
    footer-bg-variant="dark"
    text-variant="black"
    header="Exercice 8"
    footer-tag="footer"
    title="Saisis les mots suivants :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <section class="word">
        <span class="letter" v-for="letter in letters" :class="{current: letter.current}">{{letter.name}}</span>
      </section>
      <div><input class="input" type="text" v-model="value" @keypress="stopSpeech" @input="checkWord" :disabled="success" v-focus></div>
      <div>
        <p v-if="error" class="is-error">Oups, tu t'es trompé(e) de lettre, réessaie !</p>
      </div>
      <div v-if="success">
        <span class="is-success">Bravo !</span>
      </div>
    </section>
    <template #footer>
      <div>
        <p class="errors-count" v-show="hasMadeOneError">
          <strong>{{ wordErrors }}</strong> erreur a été commise pour le mot <strong>{{ word }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ wordErrors }}</strong> erreurs ont été commises pour le mot <strong>{{ word }}</strong>
        </p>
      </div>
      <div v-show="isEnd">
        <p class="score">Taux de réussite : {{ score }} %</p>
        <span>Temps passé sur l'exercice :<clock ref="clock"></clock></span>
      </div>
    </template>
  </b-card>
  <b-button class="home-button" pill variant="primary" @click.prevent="$router.push('/')">Retour au menu principal</b-button>
</div>
</template>

<script>

import speakMixin from '../mixins/speakMixin'
import wordMixin from '../mixins/wordMixin'
import watchMixin from '../mixins/watchMixin'
import exercisesMixin from '../mixins/exercisesMixin'

const data = require('../data/exercises_content.json')

export default {
  mixins: [speakMixin, wordMixin, watchMixin, exercisesMixin],
  data () {
    return {
      consigne: 'Saisis les mots suivants :',
      word: '',
      letters: [],
      current: '',
      value: '',
      words: data.left-hand-words,
      attempts: 0, // nb total d'essais
      error: false,
      incorrect_previous_letter: false,
      success: false,
      wordErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
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
justify-content: flex-start;
align-content: space-between;
flex-flow: wrap column;
}

.letter {
visibility: aria-hidden;
font-size: 80px;
background: rgba(0, 0, 0, 0.003);
white-space: nowrap;
}

.letter.current {
  background-color: #2577f1;
}

.input{
visibility: aria-hidden;
font-size: 80px;
margin: 16px 16px 16px 0px
}

.home-button{
  margin: 1em;
}

</style>
