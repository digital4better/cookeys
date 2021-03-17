<template>
  <exercise name="Exercice 7" :words="words"/>
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
      words: [...data.right_hand_words]
    }
  }
}
</script>

<style scoped>
</style>
