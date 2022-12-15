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
    title="Appuie sur les touches :"
    style="font-family: 'Tiresias Infofont', arial">
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
          @change="stopSpeech"
          @keydown="checkKey"
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
  <b-button class="home-button" pill variant="primary" @click.prevent="$router.push('/')">Retour au menu principal</b-button>
</div>
</template>

<script>

import speakMixin from '@/mixins/speakMixin'
import keyMixin from '@/mixins/keyMixin'
import watchMixin from '@/mixins/watchMixin'
import exercisesMixin from '@/mixins/exercisesMixin'

export default {
  mixins: [speakMixin, keyMixin, watchMixin, exercisesMixin],
  data () {
    return {
      consigne: 'Appuie sur les touches suivantes :',
      key: '',
      value: '',
      keys: [],
      attempts: 0, // nb total d'essais
      error: false,
      success: false,
      keyErrors: 0, // nb d'erreur par lettre
      totalErrors: 0, // nb d'erreur total
      score: 0 // pourcentage de réussite
    }
  },
  methods: {
    initContent () {
      const data = this.$store.state.data
      this.keys = [...data.keys]
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

.key {
  visibility: aria-hidden;
  font-size: 80px;
  background: rgba(0, 0, 0, 0.003);
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
