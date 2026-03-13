<template>
  <div class="flex flex-col w-full h-full p-8">

    <!-- <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-5"> Palabras </p>
      <input type="file" class="hidden" id="file" ref="fileInput" @change="readFil">
      <label for="file" class="file"> Selecciona archivo </label>
      <btnComponent color="green">
        Guardar
        <template #icon>
          <i class="icon icon-download"></i>
        </template>
      </btnComponent>
    </div> -->

    <p class="text-2xl font-bold mb-6">Categorías</p>

    <div class="flex flex-col space-y-3 w-7/8 lg:w-2/3 mx-auto">
      <div v-for="cat in categoryNames" :key="cat"
        class="border rounded-xl overflow-hidden shadow-sm bg-white">
        <div class="grid grid-cols-2">
          <p class="col-span-2 font-bold text-lg px-4 py-3 border-b">{{ cat }}</p>
          <button
            class="flex items-center justify-center space-x-2 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold border-r"
            @click="shareCategory(cat)">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span>Compartir</span>
          </button>
          <button
            class="flex items-center justify-center space-x-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold"
            @click="deleteCategory(cat)">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>

    <p class="mt-auto pt-10 text-sm text-gray-400">By C. Ramirez</p>

  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'
  import { encodeCategory } from '@/utils/shareEncoding'

  const wordsStore = useWordsStore() // use store
  const { categories } = storeToRefs(wordsStore)
  const fileInput = ref(null)

  const categoryNames = computed(() => Object.keys(categories.value))

  function addWord (_word){
    const aux = {
      side_1: _word[0],
      img_1: _word[1],
      sound_1: _word[2],
      info_1: _word[3],
      side_2: _word[4],
      img_2: _word[5],
      sound_2: _word[6],
      info_2: _word[7],
      category: _word[8]
    };
    wordsStore.addWord(aux)
  }

  function deleteCategory(category){
    wordsStore.deleteCategory(category)
  }

  function shareCategory(categoryName) {
    const cards = wordsStore.categories[categoryName]
    const encoded = encodeCategory(categoryName, cards)
    const url = window.location.origin + import.meta.env.BASE_URL + '#/import?d=' + encoded
    if (navigator.share) {
      navigator.share({ title: categoryName, url }).catch(() => {})
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => fallbackCopy(url))
    } else {
      fallbackCopy(url)
    }
  }

  function fallbackCopy(url) {
    const el = document.createElement('textarea')
    el.value = url
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  function readFil (){
    const file = fileInput.value.files[0]
    const reader = new FileReader()

    reader.onload = function (e) {
      const content = e.target.result
      const lines = content.split('\n')

      wordsStore.clear()

      for (let i = 1; i < lines.length-1; i++) {
        const line = lines[i]
        const data = line.split(',')
        addWord(data)
      }
      wordsStore.changeWords()
    }

    reader.readAsText(file);
  }
</script>

<style scoped>
  .file {
    @apply border-b-2 border-gray-800 px-5 cursor-pointer;
  }
</style>
