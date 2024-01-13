<template>
  <div class="flex justify-center items-center w-full h-screen relative">

    <div class="flex items-center justify-center absolute h-screen w-1/12 md:w-1/6 left-0 cursor-pointer" @click="_back">
      <i class="text-xl text-white icon icon-backward"></i>
    </div>
    <div class="flex items-center justify-center absolute h-screen w-1/12 md:w-1/6 right-0 cursor-pointer" @click="_next">
      <i class="text-xl text-white icon icon-forward"></i>
    </div>

    <div class="flex flex-col justify-center items-center w-5/6 md:w-2/3 h-screen mx-auto space-y-5">
      <div class="flip-card">
        <div class="card" ref="card" @click="toggleCard">
          <div class="front">
            <img :src="categories[index].img_1" class="w-auto max-h-[50vh] mx-auto">
            <p class="font-bold text-center text-3lx"> {{ categories[index].side_1 }} </p>
          </div>
          <div class="back">
            <img :src="categories[index].img_2" class="w-auto max-h-[50vh] mx-auto">
            <p class="font-bold text-center text-3lx"> {{ categories[index].side_2 }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'

  const wordsStore = useWordsStore() // use store
  const { categories:_categories, showCategories } = storeToRefs(wordsStore)

  const categories = ref([])
  const index = ref(0)
  const card = ref(null)

  showCategories.value.forEach( (item) => {
    categories.value.push(..._categories.value[item])
  })

  function toggleCard (){
    if (card.value.classList.contains('card-flip')) card.value.classList.remove('card-flip')
    else card.value.classList.add('card-flip')
  }

  function _next (){
    if (index.value == showCategories.value.length-1) index.value = 0
    else index.value += 1
  }
  function _back (){
    if (index.value == 0) index.value = showCategories.value.length-1
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
