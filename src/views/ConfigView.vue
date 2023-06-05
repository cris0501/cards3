<template>
  <div class="flex flex-col justify-evenly items-center flex-wrap w-full h-screen p-8 mt-12">

    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-8"> Palabras </p>
      <input type="file" class="hidden" id="file">
      <label for="file" class="file"> Cargar archivo </label>

      <btn color="green">
        <template #text>
          Guardar
        </template>
        <template #icon>
          <i class="icon icon-download"></i>
        </template>
      </btn>
    </div>

    <div class="flex flex-col md:flex-row md:space-x-8 items-center">
      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-8"> Que lado de la tarjeta mostrar </p>
        <div class="flex flex-col">
          <btn color="gray">
            <template #text>
              Vista frontal
            </template>
          </btn>
          <btn color="gray">
            <template #text>
              Vista posterior
            </template>
          </btn>
          <btn color="gray">
            <template #text>
              Ambas
            </template>
          </btn>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center md:w-1/2">
        <p class="text-center text-2xl font-bold mb-8"> Categorias </p>
        <div class="flex flex-col" @click="hola">
          <btn color="gray">
            <template #text>
              Vista frontal
            </template>
          </btn>
          <btn color="gray">
            <template #text>
              Vista posterior
            </template>
          </btn>
          <btn color="gray" @click="addWord">
            <template #text>
              {{ words }}
            </template>
          </btn>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import add from '@/composables/useAddWord'
  import btn from '@/components/Button.vue'

  export default {
    components: {
      btn
    },
    setup(){
      const words = useWordsStore() // use store

      function addWord (){
        const aux = {
          side_1: 'Adios',
          side_2: 'Auf Wiedersen'
        };
        add(aux);
      }

      return {
        addWord,
        words:words.words,
      }
    }
  }
</script>

<style scoped>
  .file {
    @apply border-b-2 border-white px-5 text-white cursor-pointer;
  }
</style>
