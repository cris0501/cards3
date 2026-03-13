<template>
  <div class="flex flex-col justify-center items-center z-[3]">
    <div class="flip-card relative">
      <i class="absolute top-4 right-1 icon icon-cross text-red-400 z-[2]" v-if="props.delete" @click="deleteWord"></i>
      <div class="card relative" :class="(props.bg) ? bg:'bg-blue-600'" ref="card" @click="toggleCard">
        <div class="front">
          <img v-if="img1Src" :src="img1Src" class="w-auto max-h-[50%] mx-auto mb-5" draggable="false">
          <p class="font-bold text-center text-3lx"> {{ word.side_1 }} </p>
          <p v-if="word.info_1" class="text-sm text-center opacity-50 mt-2 px-4"> {{ word.info_1 }} </p>
        </div>
        <div class="back">
          <img v-if="img2Src" :src="img2Src" class="w-auto max-h-[50%] mx-auto mb-5" draggable="false">
          <p class="font-bold text-center text-3lx"> {{ word.side_2 }} </p>
          <p v-if="word.info_2" class="text-sm text-center opacity-50 mt-2 px-4"> {{ word.info_2 }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Card.vue
  // Resuelve img_1 / img_2: si es un ID local lo carga de IndexedDB,
  // si es una URL la usa directamente. Revoca los object URLs al desmontar.

  import { ref, watch, onBeforeUnmount } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import { getImage, isLocalImage } from '@/utils/imageStore'

  const wordsStore = useWordsStore()
  const { showWords } = storeToRefs(wordsStore)
  const props = defineProps(['word', 'bg', 'delete'])
  const card = ref(null)

  const img1Src = ref('')
  const img2Src = ref('')

  // Guarda los object URLs creados para poder revocarlos despues
  const createdObjectUrls = []

  async function resolveImg(value) {
    if (!value) return ''
    if (isLocalImage(value)) {
      const blob = await getImage(value)
      if (!blob) return ''
      const url = URL.createObjectURL(blob)
      createdObjectUrls.push(url)
      return url
    }
    return value
  }

  watch(() => props.word, async (w) => {
    img1Src.value = await resolveImg(w.img_1)
    img2Src.value = await resolveImg(w.img_2)
  }, { immediate: true })

  // Libera memoria al desmontar el componente
  onBeforeUnmount(() => {
    createdObjectUrls.forEach(u => URL.revokeObjectURL(u))
  })

  function deleteWord() {
    wordsStore.deleteWord(props.word.category, props.word.index)
  }

  function toggleCard(event) {
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
