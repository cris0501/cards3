<template>
  <div class="flex items-center justify-center absolute top-0 left-0 w-screen h-[100vh] bg-gray-800/80 z-20" @click="exit">
    <div class="flex flex-col justify-center items-center w-5/6 rounded-lg bg-slate-700 px-4 py-6 space-y-5">
      <p class="text-lg font-bold"> Agregar palabra </p>
      <div class="flex flex-col lg:flex-row w-5/6 lg:space-x-5">
        <div class="flex flex-1 flex-col space-y-3 mt-4">
          <p class="font-bold"> Frontal </p>
          <input type="text" placeholder="Frontal">
          <input type="text" placeholder="Informacion">
          <input type="text" placeholder="Imagen">
          <input type="text" placeholder="Audio">
        </div>
        <div class="flex flex-1 flex-col space-y-3 mt-4">
          <p class="text-right font-bold"> Trasera </p>
          <input type="text" placeholder="Trasera">
          <input type="text" placeholder="Informacion">
          <input type="text" placeholder="Imagen">
          <input type="text" placeholder="Audio">
        </div>
      </div>
      <div class="flex w-5/6">
        <input type="text" placeholder="Categoria" class="flex-1">
      </div>
      <div class="flex items-center justify-center w-5/6 lg:w-1/2 space-x-5">
        <btnComponent color="green" class="flex-1">
          Guardar
        </btnComponent>
        <btnComponent color="red" class="flex-1" @click="close">
          Cancelar
        </btnComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits } from 'vue'
  import btnComponent from '@/components/Button.vue'

  const emits = defineEmits(['close'])

  function close (e){
    emits('close')
  }
  function exit (e){
    if (e.target === e.currentTarget) emits('close')
  }
</script>

<style scoped>
  input {
    @apply px-2 py-1 rounded;
  }
</style>
