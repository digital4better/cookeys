<template>
<div>
  <b-card class="exercise"
    bg-variant="light"
    header-bg-variant="dark"
    header-text-variant="white"
    footer-text-variant="white"
    footer-bg-variant="dark"
    text-variant="black"
    header="Exercice 5"
    footer-tag="footer"
    title="Saisis les lettres suivantes :"
    style="font-family: 'Tiresias Infofont', arial">

    <link href="https://fr.allfont.net/allfont.css?fonts=tiresias-infofont" rel="stylesheet" type="text/css" />

    <section class=body>
      <div><span class="letter"> {{ letter }}</span></div>
      <div><input class="input" type="text" v-model="value" @keydown="checkLetter" :disabled="success" v-focus></div>
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
          <strong>{{ letterErrors }}</strong> erreur a été commise pour la lettre <strong>{{ letter }}</strong>
        </p>
        <p class="errors-count" v-show="hasMadeErrors">
          <strong>{{ letterErrors }}</strong> erreurs ont été commises pour la lettre <strong>{{ letter }}</strong>
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
import letterMixin from '../mixins/letterMixin'
import watchMixin from '../mixins/watchMixin'
import exercisesMixin from '../mixins/exercisesMixin'

export default {
  mixins: [speakMixin, letterMixin, watchMixin, exercisesMixin],
  data () {
    return {
      consigne: 'Saisis les lettres suivantes :',
      letter: '',
      value: '',
      letters: [],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      letterErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  methods: {
    initContent () {
      this.clearRequireCache()
      const data = require('../data/exercises_content.json')
      this.letters = data.letters
    }
  }
}
</script>
<style scoped>

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

.letter {
visibility: aria-hidden;
font-size: 80px;
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
