<template>
  <exercise name="Exercice 10" :words="words"/>
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
      words: [...data.special_characters_words]
    }
  }
}
</script>

<style scoped>
</style>
