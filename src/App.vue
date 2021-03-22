<template>
<div>
  <router-view/>
</div>
</template>

<script>
import Home from '@/pages/home.vue'

export default {
  components: {
    Home
  },
  created () {
    this.$store.commit('loadData')
  }
}
</script>
