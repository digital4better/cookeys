<template>
  <exercise name="Exercice 11" :words="words"/>
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
      words: [...data.sentences]
    }
  }
}
</script>

<style scoped>
</style>
