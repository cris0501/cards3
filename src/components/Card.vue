<template>
  <div class="flex flex-col justify-center items-center z-[3]">
    <div class="flip-card relative">
      <i class="absolute top-4 right-1 icon icon-cross text-red-400 z-[2]" v-if="props.delete" @click="deleteWord"></i>
      <div class="card relative" :class="(props.bg) ? bg:'bg-blue-600'" ref="card" @click="toggleCard">
        <div class="front">
          <img :src="word.img_1" class="w-auto max-h-[50%] mx-auto mb-5" draggable="false">
          <p class="font-bold text-center text-3lx"> {{ word.side_1 }} </p>
        </div>
        <div class="back">
          <img :src="word.img_2" class="w-auto max-h-[50%] mx-auto mb-5" draggable="false">
          <p class="font-bold text-center text-3lx"> {{ word.side_2 }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'

  const wordsStore = useWordsStore() // use store
  const { showWords } = storeToRefs(wordsStore)
  const props = defineProps(['word', 'bg', 'delete'])
  const card = ref(null)

  function deleteWord (){
    wordsStore.deleteWord(props.word.category, props.word.category.index)
  }

  function toggleCard (event){
    if (card.value.classList.contains('card-flip')) card.value.classList.remove('card-flip')
    else card.value.classList.add('card-flip')
  }
</script>

<style scoped>
  .flip-card {
    @apply w-full h-full mx-auto;
    perspective: 10000px; 
  }
  .card-flip {
    transform: rotateY(180deg);
  }

  .card {
    @apply flex items-center justify-center w-full h-full rounded-2xl;
    transition: transform 1s;
    transform-style: preserve-3d;
  }
    .card > div {
      @apply flex flex-col justify-center items-center;
    }

  .front, .back {
    @apply absolute flex items-center justify-center w-full h-full;
    backface-visibility: hidden;
  }
  .back {
    transform: rotateY(180deg);
  }
</style>
