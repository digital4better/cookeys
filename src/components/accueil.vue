<template>
  <div>
    <section class="landing-page">
      <header class="header">
        <h1>Accueil</h1>
      </header>
      <router-link to="/key_exercise" tag="b-button">Exercice 1 : La frappe des lettres</router-link>
      <router-link to="/word_exercise" tag="b-button">Exercice 2 : Mots et phrases</router-link>
    </section>
  </div>
</template>

<script>

export default {
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
