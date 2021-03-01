import Vue from 'vue'
import Router from 'vue-router'
import Exercise from '@/components/exercise'
import Accueil from '@/components/accueil'
import Speech from '@/components/speech'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/exercise',
      name: 'exercise',
      component: Exercise
    },
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/speech',
      name: 'speech',
      component: Speech
    }
  ]
})
