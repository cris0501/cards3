<template>
  <div class="flex flex-col justify-center items-center flex-wrap w-full h-full p-8">

    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-5"> Palabras </p>
      <input type="file" class="hidden" id="file" ref="fileInput" @change="readFil">
      <label for="file" class="file"> Selecciona archivo </label>

      <btnComponent color="green">
        Guardar
        <template #icon>
          <i class="icon icon-download"></i>
        </template>
      </btnComponent>
    </div>

    <div class="w-full px-3 py-1 my-5">
      <div class="mx-auto border-dashed border-2">
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:space-x-8 items-center my-5">
      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold"> Que lado de la tarjeta mostrar </p>
        <div class="flex flex-col my-3">
          <btnComponent color="gray">
            Vista frontal
          </btnComponent>
          <btnComponent color="gray">
            Vista posterior
          </btnComponent>
        </div>
      </div>

      <div class="md:hidden w-full px-3 py-1 my-5">
        <div class="mx-auto border-dashed border-2">
        </div>
      </div>

      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-4"> Categorias </p>
        <div class="flex flex-col">
          <btnComponent v-for="category in btnCategories"
            :color="category.bg">
              {{ category.label }}
              <template #icon>
                <svg @click.stop="shareCategory(category.label)"
                  class="w-5 h-5 mr-3 cursor-pointer text-green-200 hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <i class="icon icon-cross text-red-400" @click="deleteCategory(category.label)"></i>
              </template>
          </btnComponent>
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

  const btnCategories = computed( () =>
    Object.keys(categories.value).map(label => ({ label, bg: 'green' }))
  )

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
