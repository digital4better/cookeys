import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/accueil'
import KeyExercise from '@/components/key_exercise'
import LetterExercise from '@/components/letter_exercise'
import FirstLineExercise from '@/components/first_line_exercise'
import SecondLineExercise from '@/components/second_line_exercise'
import ThirdLineExercise from '@/components/third_line_exercise'
import WordExercise from '@/components/word_exercise'
import AccentExercise from '@/components/accent_exercise'
import SentenceExercise from '@/components/sentence_exercise'
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
      path: '/speech_controls',
      name: 'speech_controls',
      component: SpeechControls
    },
    {
      path: '/key_exercise',
      name: 'key_exercise',
      component: KeyExercise
    },
    {
      path: '/first_line_exercise',
      name: 'first_line_exercise',
      component: FirstLineExercise
    },
    {
      path: '/second_line_exercise',
      name: 'second_line_exercise',
      component: SecondLineExercise
    },
    {
      path: '/third_line_exercise',
      name: 'third_line_exercise',
      component: ThirdLineExercise
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
      path: '/accent_exercise',
      name: 'accent_exercise',
      component: AccentExercise
    },
    {
      path: '/sentence_exercise',
      name: 'sentence_exercise',
      component: SentenceExercise
    }
  ]
})
