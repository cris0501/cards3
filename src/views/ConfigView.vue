<template>
  <div class="flex flex-col justify-evenly items-center flex-wrap w-full h-screen p-8">

    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-8"> Palabras </p>
      <input type="file" class="hidden" id="file" ref="fileInput" @change="readFil">
      <label for="file" class="file"> Selecciona archivo </label>

      <btnComponent color="green">
        Guardar
        <template #icon>
          <i class="icon icon-download"></i>
        </template>
      </btnComponent>
    </div>

    <div class="flex flex-col md:flex-row md:space-x-8 items-center">
      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-8"> Que lado de la tarjeta mostrar </p>
        <div class="flex flex-col">
          <btnComponent color="gray">
            Vista frontal
          </btnComponent>
          <btnComponent color="gray">
            Vista posterior
          </btnComponent>
          <btnComponent color="gray" @click="addWord">
            Ambas
          </btnComponent>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-8"> Categorias </p>
        <div class="flex flex-col">
          <btnComponent v-for="category in btnCategories"
            :color="category.bg"
            @click="toggleShow(category.label)">
              {{ category.label }}
          </btnComponent>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'

  const wordsStore = useWordsStore() // use store
  const { categories, showCategories } = storeToRefs(wordsStore)
  const fileInput = ref(null)

  const btnCategories = computed( () => {
    let btns = []
    Object.keys(categories.value).map( (item) => {
      if( showCategories.value.includes(item) ){
        btns.push ({
          label: item,
          bg: 'green'
        })
      } else {
        btns.push ({
          label: item,
          bg: 'gray'
        })
      }
    })
    return btns
  })

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

  function toggleShow(category){
    if ( showCategories.value.includes(category) ){
      const index = showCategories.value.indexOf(category)
      showCategories.value.splice(index, 1)
    }
    else {
      showCategories.value.push(category)
    }
  }

  function readFil (){
    const file = fileInput.value.files[0]
    const reader = new FileReader()

    reader.onload = function (e) {
      const content = e.target.result
      const lines = content.split('\n')

      for (let i = 1; i < lines.length-1; i++) {
        const line = lines[i]
        const data = line.split(',')
        addWord(data)
      }
    }

    reader.readAsText(file);
  }
</script>

<style scoped>
  .file {
    @apply border-b-2 border-white px-5 text-white cursor-pointer;
  }
</style>
