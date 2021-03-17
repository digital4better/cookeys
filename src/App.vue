<template>
<div>
  <router-view/>
</div>
</template>

<script>
import Accueil from '@/pages/accueil.vue'

export default {
  components: {
    Accueil
  },
  mounted () {
    this.$store.commit('loadData')
  }
}
</script>
