import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
// 
//   return { count, doubleCount, increment }
// })

export const useWordsStore = defineStore('counter', () => {
  const words = ref([
    {
      esp: 'Día',
      info1: '',
      trad: 'Tag',
      info2: '',
      img: '',
      sound: '',
    },
    {
      esp: 'Semana',
      info1: '',
      trad: 'Wohen',
      info2: '',
      img: '',
      sound: '',
    },
  ])

  function addWord(_new) {
    count.value.append(_new);
  }

  return { words, addWord }
})
