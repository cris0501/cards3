import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const TUTORIAL_CARDS = [
  {
    side_1: 'Toca la tarjeta',
    img_1: '',
    sound_1: '',
    info_1: 'Cara frontal de la tarjeta',
    side_2: '¡Se voltea!',
    img_2: '',
    sound_2: '',
    info_2: 'Cara trasera de la tarjeta',
    index: 0,
    category: 'Tutorial',
  },
  {
    side_1: 'Usa el menú ☰',
    img_1: '',
    sound_1: '',
    info_1: 'Puedes agregar tus propias tarjetas',
    side_2: '¡Empieza a aprender!',
    img_2: '',
    sound_2: '',
    info_2: 'Importa un CSV o crea tarjetas desde Ajustes',
    index: 1,
    category: 'Tutorial',
  },
]

export const useWordsStore = defineStore('words', () => {
  const side = ref('front'); //Side show
  const categories = ref({}); // cat: [{word}, {word}]
  const showCategories = ref([]); // ['cat','cat']
  const words = ref([]); // [{word}, {word}]
  const showWords = ref([]) // [word, word]

  function addCategory (_new){ // object list of categories
    if( Object.keys(categories.value).includes(_new) ) return false
    categories.value[_new] = []
  }

  function deleteCategory (category){
    delete categories.value[category]
    if ( showCategories.value.includes(category) ){
      showCategories.value.splice(showCategories.value.indexOf(category), 1)
    }
    changeWords()
  }

  function addWord (_new ){
    const category = (_new.category)? _new.category : 'Otras'
    addCategory(category)

    const temp = {
      side_1: (_new.side_1)? _new.side_1 : '',
      img_1: (_new.img_1)? _new.img_1 : '',
      sound_1: (_new.sound_1)? _new.sound_1 : '',
      info_1: (_new.info_1)? _new.info_1 : '',
      side_2: (_new.side_2)? _new.side_2 : '',
      img_2: (_new.img_2)? _new.img_2 : '',
      sound_2: (_new.sound_2)? _new.sound_2 : '',
      info_2: (_new.info_2)? _new.info_2 : '',
      index: category.length,
      category: (_new.category)? _new.category : 'Otras',
    }

    categories.value[temp.category].push(temp) // Se agrega la palabra al array de la categoria
    words.value.push(temp);

    changeWords()
  }

  function deleteWord(category, index){
    categories.value[category].splice(index, 1)
    if (categories.value[category].length == 0) deleteCategory(category)

    changeWords()
  }

  function toggleShowCategory (category){
    if( showCategories.value.includes(category) ){
      const index = showCategories.value.indexOf(category)
      showCategories.value.splice(index, 1)
    }
    else showCategories.value.push(category)

    changeWords()
  }

  function changeWords(){
    showWords.value = []
    showCategories.value.forEach( (item) => {
      showWords.value = showWords.value.concat(categories.value[item])
    })

    save()
  }

  function save(){
    localStorage.setItem('showWords', JSON.stringify(showWords.value))
    localStorage.setItem('words', JSON.stringify(words.value))
    localStorage.setItem('showCategories', JSON.stringify(showCategories.value))
    localStorage.setItem('categories', JSON.stringify(categories.value))
  }

  function load(){
    const hasData = localStorage.words && JSON.parse(localStorage.getItem('words')).length > 0

    if (!hasData) {
      categories.value = { Tutorial: [...TUTORIAL_CARDS] }
      words.value = [...TUTORIAL_CARDS]
      showCategories.value = ['Tutorial']
      showWords.value = [...TUTORIAL_CARDS]
      save()
      return
    }

    showWords.value = JSON.parse(localStorage.getItem('showWords'))
    words.value = JSON.parse(localStorage.getItem('words'))
    showCategories.value = JSON.parse(localStorage.getItem('showCategories'))
    categories.value = JSON.parse(localStorage.getItem('categories'))
  }

  function clear (){
    showWords.value = []
    words.value = []
    showCategories.vaue = []
    categories.value = {}
    console.log("Clear")
  }

  return {
    side,
    categories,
    addCategory,
    deleteCategory,
     
    showCategories,
    toggleShowCategory,

    showWords,
    addWord,
    deleteWord,

    load,
    clear,
    changeWords
  }
})

