import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import KeyExercise from '@/pages/exercises/key_exercise'
import LetterExercise from '@/pages/exercises/letter_exercise'
import BothHandsWordExercise from '@/pages/exercises/both_hands_word_exercise'
import LeftHandWordExercise from '@/pages/exercises/left_hand_word_exercise'
import RightHandWordExercise from '@/pages/exercises/right_hand_word_exercise'
import AccentWordExercise from '@/pages/exercises/accent_word_exercise'
import CapitalLettersAccentWordExercise from '@/pages/exercises/capital_letters_accent_word_exercise'
import SpecialCharactersWordExercise from '@/pages/exercises/special_characters_word_exercise'
import SentenceExercise from '@/pages/exercises/sentence_exercise'
import PunctuationExercise from '@/pages/exercises/punctuation_exercise'
import PunctuationWordExercise from '@/pages/exercises/punctuation_word_exercise'
import SpeechControls from '@/components/speech_controls'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/both_hands_word_exercise',
      name: 'both_hands_word_exercise',
      component: BothHandsWordExercise
    },
    {
      path: '/left_hand_word_exercise',
      name: 'left_hand_word_exercise',
      component: LeftHandWordExercise
    },
    {
      path: '/right_hand_word_exercise',
      name: 'right_hand_word_exercise',
      component: RightHandWordExercise
    },
    {
      path: '/special_characters_word_exercise',
      name: 'special_characters_word_exercise',
      component: SpecialCharactersWordExercise
    },
    {
      path: '/accent_word_exercise',
      name: 'accent_word_exercise',
      component: AccentWordExercise
    },
    {
      path: '/capital_letters_accent_word_exercise',
      name: 'capital_letters_accent_word_exercise',
      component: CapitalLettersAccentWordExercise
    },
    {
      path: '/punctuation_exercise',
      name: 'punctuation_exercise',
      component: PunctuationExercise
    },
    {
      path: '/punctuation_word_exercise',
      name: 'punctuation_word_exercise',
      component: PunctuationWordExercise
    },
    {
      path: '/sentence_exercise',
      name: 'sentence_exercise',
      component: SentenceExercise
    }
  ]
})
