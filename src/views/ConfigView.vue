<template>
  <div class="flex flex-col justify-evenly items-center flex-wrap w-full h-screen p-8 mt-12">

    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-8"> Palabras </p>
      <input type="file" class="hidden" id="file">
      <label for="file" class="file"> Cargar archivo </label>

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
          <btnComponent color="gray">
            <template #text>
              Ambas
            </template>
          </btnComponent>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-8"> Categorias </p>
        <div class="flex flex-col" @click="hola">
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
              {{ words }}
            </template>
          </btnComponent>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import add from '@/composables/useAddWord'
  import btnComponent from '@/components/Button.vue'

  const words = useWordsStore() // use store

  function addWord (){
    const aux = {
      side_1: 'Adios',
      side_2: 'Auf Wiedersen'
    };
    add(aux);
  }
</script>

<style scoped>
  .file {
    @apply border-b-2 border-white px-5 text-white cursor-pointer;
  }
</style>
