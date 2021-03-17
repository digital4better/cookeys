<template>
  <exercise name="Exercice 3" :words="words"/>
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
      words: [...data.punctuation]
    }
  }
}
</script>

<style scoped>
</style>
