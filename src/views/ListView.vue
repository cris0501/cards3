<template>
  <div class="flex flex-wrap justify-evenly items-center w-full h-full p-8">
    <template v-if="showWords.length > 0">
      <card class="h-[25vh] w-[80vw] md:w-[40vw] lg:w-[25vw] my-3"
        v-for="(word, ind) in showWords"
        :bg="colors[ind%3]"
        :word="word"
        :delete="true"/> 
    </template>
    <template v-else>
      <p class="text-gray-400 dark:text-slate-500 text-center">No hay tarjetas cargadas.</p>
    </template>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import card from '@/components/Card.vue'

  const wordsStore = useWordsStore() // use store
  const { showWords } = storeToRefs(wordsStore)
  const colors = ref(['bg-blue-600', 'bg-purple-400', 'bg-yellow-600'])
</script>

<style scoped>
</style>
