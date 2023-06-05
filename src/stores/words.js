import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWordsStore = defineStore('words', () => {
  const side = ref('front'); // back
  const categories = ref([]); // list of categories
  const showCategories = ref([]); // []->all
  const words = ref([
    {
      side_1: 'Hola',
      img_1: null,
      sound_1: null,
      info_1: null,
      side_2: 'Hallo',
      img_2: null,
      sound_2: null,
      info_2: null,
      category: 'Saludos',
    }
  ]);

  ////////// Setters //////////
  function setShowCategories (aux){
    showCategories.value = aux;
  }

  function addWord( _new ) {
    words.value.push(_new);

    //words.value.push({
    //  side_1: 'Adios',
    //  img_1: '',
    //  sound_1: '',
    //  info_1: '',
    //  side_2: 'Auf Wiedersen',
    //  img_2: '',
    //  sound_2: '',
    //  info_2: '',
    //  category: 'Saludos',
    //});
  }

  return {
    side,
    categories,
    words,
    showCategories,

    setShowCategories,
    addWord
  }
})

