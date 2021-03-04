import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/accueil'
import KeyExercise from '@/components/key_exercise'
import LetterExercise from '@/components/letter_exercise'
import WordExercise from '@/components/word_exercise'
import SpeechControls from '@/components/speech_controls'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/key_exercise',
      name: 'key_exercise',
      component: KeyExercise
    },
    {
      path: '/letter_exercise',
      name: 'letter_exercise',
      component: LetterExercise
    },
    {
      path: '/word_exercise',
      name: 'word_exercise',
      component: WordExercise
    },
    {
      path: '/speech_controls',
      name: 'speech_controls',
      component: SpeechControls
    }
  ]
})
