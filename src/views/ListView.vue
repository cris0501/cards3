<template>
  <div class="flex flex-col md:flex-row justify-evenly items-center min-h-screen">
    <div class="flip-card" v-for="(card,index) in cards" :key="'c-'+index">
        <div class="card" ref="card" @click="toggleCard">
          <div class="front">
            <img :src="card.img_1" class="w-auto max-h-[40vh] mx-auto">
            <p class="font-bold text-center text-3lx"> {{ card.side_1 }} </p>
          </div>
          <div class="back">
            <img :src="card.img_2" class="w-auto max-h-[40vh] mx-auto">
            <p class="font-bold text-center text-3lx"> {{ card.side_2 }} </p>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'

  const wordsStore = useWordsStore() // use store
  const { categories:_categories, showCategories } = storeToRefs(wordsStore)

  const cards = ref([])
  const index = ref(0)
  const card = ref(null)

  showCategories.value.forEach( (item) => {
    cards.value.push(..._categories.value[item])
  })

  function toggleCard (e){
    console.log(e.currentTarget)
    if (e.currentTarget.classList.contains('card-flip')) e.currentTarget.classList.remove('card-flip')
    else e.currentTarget.classList.add('card-flip')
  }
</script>

<style scoped>
  .flip-card {
    @apply flex w-5/6 md:flex-1 p-2 mb-4;
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

  .front, .back {
    @apply flex-col flex items-center justify-center w-full p-4 bg-gray-200/10;
    backface-visibility: hidden;
  }
  .back {
    @apply absolute;
    transform: rotateY(180deg);
  }
</style>
