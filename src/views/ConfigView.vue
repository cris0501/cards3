<template>
  <div class="flex flex-col justify-evenly items-center flex-wrap w-full h-screen p-8 mt-12">

    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-8"> Palabras </p>
      <input type="file" class="hidden" id="file">
      <label for="file" class="file"> Selecciona archivo </label>

      <btnComponent color="green">
        <template #text>
          Guardar
        </template>
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
            <template #text>
              Vista frontal
            </template>
          </btnComponent>
          <btnComponent color="gray">
            <template #text>
              Vista posterior
            </template>
          </btnComponent>
          <btnComponent color="gray" @click="addWord">
            <template #text>
              Ambas
            </template>
          </btnComponent>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-8"> Categorias </p>
        <div class="flex flex-col" @click="hola">
          <btnComponent v-for="category in Object.keys(categories)"
            :color="{'gray':!showCategory(category)}"
            @click="show(category)">
            <template #text>
              {{ category }}
            </template>
          </btnComponent>
          <p> {{ showCategories }} </p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'

  const wordsStore = useWordsStore() // use store
  const { categories, showCategories } = storeToRefs(wordsStore)

  function addWord (){
    const aux = {
      side_1: 'Adios',
      side_2: 'Auf Wiedersen'
    };
    wordsStore.addWord(aux);
  }

  function showCategory (category){
    return showCategories.value.includes(category)
  }

  function show(category){
    if ( showCategories.value.includes(category) ){
      const index = showCategories.value.indexOf(category)
      showCategories.value.splice(index, 1)
    }
    else showCategories.value.push(category)
  }

  //const _categories = computed( () => {
  //  const keys = Object.keys(categories)
  //  return keys.filter(item => showCategories.includes(item))
  //})
</script>

<style scoped>
  .file {
    @apply border-b-2 border-white px-5 text-white cursor-pointer;
  }
</style>
