import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWordsStore = defineStore('words', () => {
  const side = ref('front'); //Side show
  const categories = ref({}); // cat: [{word}, {word}]
  const showCategories = ref([]); // ['cat','cat']
  const words = ref([]); // [{word}, {word}]

  function addCategory (_new){ // object list of categories
    if( Object.keys(categories).includes(_new.title) ) return false
    categories.value[_new] = []
    return true
  }

  function showCategory (_category){
    if( showCategories.value.includes(_category) ) return false
    showCategories.value.push(_category)
    return true
  }

  function addWord (_new ){
    const temp = {
      side_1: (_new.side_1)? _new.side_1 : '',
      img_1: (_new.img_1)? _new.img_1 : '',
      sound_1: (_new.sound_1)? _new.sound_1 : '',
      info_1: (_new.info_1)? _new.info_1 : '',
      side_2: (_new.side_2)? _new.side_2 : '',
      img_2: (_new.img_2)? _new.img_2 : '',
      sound_2: (_new.sound_2)? _new.sound_2 : '',
      info_2: (_new.info_2)? _new.info_2 : '',
      category: (_new.category)? _new.category : 'Otras',
    }

    addCategory(temp.category)
    categories.value[temp.category].push(temp) // Se agrega la palabra al array de la categoria
    words.value.push(temp);
  }

  return {
    side,
    categories,
    addCategory,

    words,
    addWord,

    showCategories,
    showCategory,
  }
})

