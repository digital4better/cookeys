<template>
  <exercise name="Exercice 6" :words="words"/>
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
      words: [...data.both_hands_words]
    }
  }
}
</script>

<style scoped>
</style>
