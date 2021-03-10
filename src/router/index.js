import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/accueil'
import KeyExercise from '@/components/key_exercise'
import LetterExercise from '@/components/letter_exercise'
import WordExercise from '@/components/word_exercise'
import LongWordExercise from '@/components/long_word_exercise'
import AccentExercise from '@/components/accent_exercise'
import SentenceExercise from '@/components/sentence_exercise'
import PunctuationExercise from '@/components/punctuation_exercise'
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
      path: '/long_word_exercise',
      name: 'long_word_exercise',
      component: LongWordExercise
    },
    {
      path: '/accent_exercise',
      name: 'accent_exercise',
      component: AccentExercise
    },
    {
      path: '/punctuation_exercise',
      name: 'punctuation_exercise',
      component: PunctuationExercise
    },
    {
      path: '/sentence_exercise',
      name: 'sentence_exercise',
      component: SentenceExercise
    }
  ]
})
