<template>
  <div 
    class="flex items-center w-full h-full overflow-x-auto snap-x snap-mandatory" 
    v-if="showWords.length > 0"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="flex-shrink-0 flex items-center justify-center w-[15vw] md:w-[12vw] h-full cursor-pointer snap-center" @click="_back">
      <i class="text-2xl icon icon-backward"></i>
    </div>
    
    <div class="flex-shrink-0 flex justify-center items-center w-[70vw] md:w-[50vw] h-full mx-auto snap-center">
      <cardComponent class="w-full h-[75dvh] snap-center" :word="showWords[index]" />
    </div>
    
    <div class="flex-shrink-0 flex items-center justify-center w-[15vw] md:w-[12vw] h-full cursor-pointer snap-center" @click="_next">
      <i class="text-2xl icon icon-forward"></i>
    </div>
  </div>

  <div v-else class="flex flex-col justify-center items-center w-full h-full">
    <p class="text-gray-400 dark:text-slate-500 text-center">No hay tarjetas cargadas.</p>
    <p class="text-sm text-gray-400 dark:text-slate-500">Agrega desde Repo o crea nuevas.</p>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'
  import cardComponent from '@/components/Card.vue'

  const wordsStore = useWordsStore() // use store
  const { categories, showWords } = storeToRefs(wordsStore)
  const index = ref(0)
  let touchStartX = 0

  function _next (){
    if (showWords.value.length === 0) return
    if (index.value == showWords.value.length-1) index.value = 0
    else index.value += 1
  }
  function _back (){
    if (showWords.value.length === 0) return
    if (index.value == 0) index.value = showWords.value.length-1
    else index.value -= 1
  }

  function handleKeydown(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') _next()
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') _back()
  }

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) _next()
      else _back()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
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
