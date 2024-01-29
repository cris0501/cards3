<template>
  <div class="flex justify-center items-center w-full h-full relative">

    <div class="flex items-center justify-center absolute h-full w-1/12 md:w-1/6 left-0 cursor-pointer" @click="_back">
      <i class="text-xl icon icon-backward"></i>
    </div>
    <div class="flex items-center justify-center absolute h-full w-1/12 md:w-1/6 right-0 cursor-pointer" @click="_next">
      <i class="text-xl icon icon-forward"></i>
    </div>

    <div class="flex flex-col justify-center items-center w-5/6 md:w-2/3 h-full mx-auto space-y-5">
      <cardComponent class="w-full h-[75vh] snap-center" :word="showWords[index]" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'
  import cardComponent from '@/components/Card.vue'

  const wordsStore = useWordsStore() // use store
  const { categories, showWords } = storeToRefs(wordsStore)
  const index = ref(0)

  function _next (){
    if (index.value == showWords.value.length-1) index.value = 0
    else index.value += 1
  }
  function _back (){
    if (index.value == 0) index.value = showWords.value.length-1
    else index.value -= 1
  }

</script>

<style scoped>
  .flip-card {
    @apply w-full h-[60vh] mx-auto;
    background-color: transparent;
    perspective: 5000px; 
  }
  .card-flip {
    transform: rotateY(180deg);
  }

  .card {
    @apply relative flex items-center justify-center w-full h-full;
    transition: transform 1s;
    transform-style: preserve-3d;
  }
    .card > div {
      @apply flex flex-col justify-center items-center;
    }

  .front, .back {
    @apply absolute flex items-center justify-center w-full h-full bg-gray-200/10;
    backface-visibility: hidden;
  }
  .back {
    transform: rotateY(180deg);
  }
</style>
