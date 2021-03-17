<template>
  <exercise name="Exercice 5" :words="words"/>
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
      words: [...data.left_hand_words]
    }
  }
}
</script>

<style scoped>
</style>
