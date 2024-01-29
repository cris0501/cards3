<template>
  <div class="flex items-center justify-center fixed top-0 left-0 w-screen h-[100vh] bg-gray-800/80 z-30" @click="exit">
    <div class="flex flex-col justify-center items-center w-5/6 rounded-lg bg-slate-200 px-4 py-6 space-y-5">
      <p class="text-lg font-bold"> Agregar palabra </p>
      <div class="flex flex-col lg:flex-row w-5/6 lg:space-x-5">
        <div class="flex flex-1 flex-col space-y-3 mt-4">
          <p class="font-bold"> Frontal </p>
          <input type="text" v-model="word.side_1" placeholder="Frontal">
          <input type="text" v-model="word.info_1" placeholder="Informacion">
          <input type="text" v-model="word.img_1" placeholder="Imagen">
          <input type="text" v-model="word.sound_1" placeholder="Audio">
        </div>
        <div class="flex flex-1 flex-col space-y-3 mt-4">
          <p class="text-right font-bold"> Trasera </p>
          <input type="text" v-model="word.side_2" placeholder="Trasera">
          <input type="text" v-model="word.info_2" placeholder="Informacion">
          <input type="text" v-model="word.img_2" placeholder="Imagen">
          <input type="text" v-model="word.sound_2" placeholder="Audio">
        </div>
      </div>
      <div class="flex w-5/6">
        <input type="text" v-model="word.category" placeholder="Categoria" class="flex-1">
      </div>
      <div class="flex flex-col md:flex-row items-center justify-center w-5/6 lg:w-1/2 space-x-0 md:space-x-5">
        <btnComponent color="green" class="w-2/3 md:w-1/3" @click="addWord">
          Guardar
        </btnComponent>
        <btnComponent color="red" class="w-2/3 md:w-1/3" @click="close">
          Cancelar
        </btnComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'

  const word = ref({
    side_1: '',
    img_1: null,
    sound_1: null,
    info_1: '',
    side_2: '',
    img_2: null,
    sound_2: null,
    info_2: '',
    category: ''
  })
  const emits = defineEmits(['close'])
  const wordsStore = useWordsStore()

  function addWord (){
    if ( word.value.side_1 == null || word.value.side_1 == '' ) return
    if ( word.value.side_2 == null || word.value.side_2 == '' ) return
    wordsStore.addWord(word.value)
    close()
  }

  function reset (){
    word.value = {
      side_1: '',
      img_1: null,
      sound_1: null,
      info_1: '',
      side_2: '',
      img_2: null,
      sound_2: null,
      info_2: '',
      category: ''
    }
  }

  function close (e){
    reset()
    emits('close')
  }
  function exit (e){
    if (e.target === e.currentTarget){
      reset()
      emits('close')
    }
  }
</script>

<style scoped>
  input {
    @apply px-2 py-1 rounded;
  }
</style>
