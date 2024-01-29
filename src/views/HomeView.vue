<template>
  <div class="flex flex-col p-8">
    <p class="w-full text-2xl font-bold"> Bievenido </p>
    <p class="fot-bold"> ¿Que vas a aprender hoy? </p>
  </div>

  <div class="w-full px-3 py-1">
    <div class="mx-auto border-dashed border-2">
    </div>
  </div>

  <div class="w-full">
    <p class="text-lg font-bold px-8 mt-4"> Ultimo visto </p>
    <div class="flex items-center w-full lg:w-5/6 max-h-[75vh] overflow-y-hidden overflow-x-auto mx-auto snap-proximity snap-x py-2 mb-4 px-8 space-x-4 scroll">
      <card class="card"
        v-for="(word, ind) in showWords"
        :bg="colors[ind%3]"
        :word="showWords[ind]" />
    </div>
  </div>

  <div class="w-full px-3 py-1">
    <div class="mx-auto border-dashed border-2">
    </div>
  </div>

  <div class="flex justify-evenly p-5">
    <div class="option bg-emerald-200">
      <router-link :to="{name: 'one'}">
        <i class="text-emerald-600 icon icon-stack"></i>
        <p class="text-emerald-600"> Tarjetas </p>
      </router-link>
    </div>

    <div class="option bg-orange-200">
      <router-link :to="{name: 'list'}">
        <i class="text-orange-600 icon icon-list"></i>
        <p class="text-orange-600"> Listado </p>
      </router-link>
    </div>

    <div class="option bg-fuchsia-200">
      <router-link :to="{name: 'simpleTest'}">
        <i class="text-fuchsia-600 icon icon-pencil"></i>
        <p class="text-fuchsia-600"> Practica </p>
      </router-link>
    </div>

    <div class="option bg-rose-200">
      <a href="#">
        <i class="text-rose-600 icon icon-list"></i>
        <p class="text-rose-600"> Repo </p>
      </a>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import card from '@/components/Card.vue'

  const wordsStore = useWordsStore() // use store
  const { showWords, categories, showCategories } = storeToRefs(wordsStore)
  const index = ref(0)
  const colors = ref(['bg-blue-600', 'bg-purple-400', 'bg-yellow-600'])
</script>

<style scoped>
  .card {
    @apply w-full h-[50vh] snap-center;
    flex: 0 0 auto;
  }
  .option {
    @apply flex items-center justify-center rounded-full w-[75px] lg:w-[100px] h-[75px] lg:h-[100px];
  }
    .option a {
      @apply flex flex-col justify-center items-center;
    }
    .option p,
    .option i {
      @apply flex flex-col items-center justify-center rounded-lg text-center cursor-pointer;
    }
    .option p {
      @apply hidden lg:block
    }
 
  .scroll::-webkit-scrollbar {
    @apply bg-white h-2;
  }
  .scroll::-webkit-scrollbar-button {
    @apply hidden;
  }
  .scroll::-webkit-scrollbar-thumb:horizontal {
    @apply bg-gray-800 rounded-lg;
  }
  .scroll::-webkit-scrollbar-thumb:vertical {
    @apply bg-gray-800;
  }
</style>
