<template>
  <exercise name="Exercice 9" :words="words"/>
</template>

<script>
import Exercise from './components/Exercise.vue'

export default {
  components: {
    Exercise
  },
  data () {
    const data = this.$store.state.data
    return {
      words: [...data.capital_letters_accents_words]
    }
  }
}
</script>

<style scoped>
</style>
