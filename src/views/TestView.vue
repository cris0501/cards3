<template>
  <div class="flex flex-col items-center justify-center self-center w-full h-view relative">
    <div class="flex items-center justify-evenly w-full fixed bottom-[90px]">
      <p class="dark:text-slate-200"> <i class="text-green-500 icon icon-ok"></i> {{ points[0] }} </p>
      <p class="dark:text-slate-200"> <i class="text-blue-500 icon icon-info"></i> {{ points[1] }} </p>
      <p class="dark:text-slate-200"> <i class="text-yellow-500 icon icon-minus"></i> {{ record }} </p>
    </div>

    <p class="font-bold text-xl mb-8 dark:text-white">{{ currentType?.label }}</p>

    <div class="w-5/6 px-3 py-1 mb-4">
      <div class="mx-auto border-dashed border-2 dark:border-slate-600"></div>
    </div>

    <div class="flex flex-col items-center my-4 min-h-[80px] justify-center">
      <img v-if="currentType?.stimulusType === 'img'"
        :src="currentWord?.[currentType.stimulusField]"
        class="max-h-[150px]" draggable="false" />
      <p v-else-if="currentType?.stimulusType === 'text'"
        class="font-bold text-3xl text-center px-4 dark:text-white">
        {{ currentWord?.[currentType.stimulusField] }}
      </p>
      <audio v-else-if="currentType?.stimulusType === 'audio'"
        :src="currentWord?.[currentType.stimulusField]"
        controls></audio>
      <p v-if="currentWord?.info_1" class="text-sm text-center opacity-50 mt-2 px-4 dark:text-slate-300">
        {{ currentWord.info_1 }}
      </p>
    </div>

    <div v-if="currentType?.answerType === 'text'" class="options" ref="opt">
      <btn color="blue" class="flex-1"
        v-for="(op, ind) in options" :key="'btn-op-'+ind"
        @click="validate(op, $event)">
        {{ op.word[currentType.answerField] }}
      </btn>
    </div>

    <div v-else-if="currentType?.answerType === 'img'" class="img-options">
      <button v-for="(op, ind) in options" :key="'img-op-'+ind"
        class="img-option border-4 rounded-lg overflow-hidden transition-colors"
        :class="imgOptionClass(op, ind)"
        @click="validateImg(op, ind)">
        <img :src="op.word[currentType.answerField]" class="w-full h-full object-cover" draggable="false" />
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import { useSysStore } from '@/stores/system'
  import btn from '@/components/Button.vue'

  const wordsStore = useWordsStore()
  const { showWords } = storeToRefs(wordsStore)
  const sysStore = useSysStore()
  const { points, record } = storeToRefs(sysStore)

  const QUESTION_TYPES = [
    {
      id: 'img-text',
      label: '¿Qué se muestra en la imagen?',
      stimulusType: 'img',
      stimulusField: 'img_2',
      answerType: 'text',
      answerField: 'side_1',
      filter: (w) => w.img_2?.trim(),
    },
    {
      id: 'text-text',
      label: '¿Cuál es la traducción?',
      stimulusType: 'text',
      stimulusField: 'side_1',
      answerType: 'text',
      answerField: 'side_2',
      filter: (w) => w.side_1?.trim() && w.side_2?.trim(),
    },
    {
      id: 'text-img',
      label: '¿Qué imagen corresponde?',
      stimulusType: 'text',
      stimulusField: 'side_1',
      answerType: 'img',
      answerField: 'img_2',
      filter: (w) => w.side_1?.trim() && w.img_2?.trim(),
    },
    {
      id: 'audio-text',
      label: '¿Qué escuchas?',
      stimulusType: 'audio',
      stimulusField: 'sound_1',
      answerType: 'text',
      answerField: 'side_2',
      filter: (w) => w.sound_1?.trim() && w.side_2?.trim(),
    },
  ]

  const currentType = ref(null)
  const currentWord = ref(null)
  const options = ref([])
  const opt = ref(null)
  const answeredIndex = ref(null)

  function renew() {
    if (opt.value) {
      Array.from(opt.value.children).forEach(div => {
        div.classList.remove('bg-green-500', 'bg-red-500')
        div.classList.add('bg-blue-500')
      })
    }
    answeredIndex.value = null

    const validTypes = QUESTION_TYPES.filter(type =>
      showWords.value.filter(type.filter).length >= 1
    )
    if (validTypes.length === 0) return

    currentType.value = validTypes[Math.floor(Math.random() * validTypes.length)]

    const pool = showWords.value.filter(currentType.value.filter)
    currentWord.value = pool[Math.floor(Math.random() * pool.length)]

    const picked = [currentWord.value]
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    for (const w of shuffled) {
      if (picked.length >= 4) break
      if (w !== currentWord.value) picked.push(w)
    }

    options.value = picked
      .sort(() => Math.random() - 0.5)
      .map(w => ({ word: w, correct: w === currentWord.value }))
  }

  function validate(op, event) {
    event.currentTarget.classList.remove('bg-blue-500')
    if (op.correct) {
      event.currentTarget.classList.add('bg-green-500')
      sysStore.addPoint(true)
    } else {
      event.currentTarget.classList.add('bg-red-500')
      sysStore.addPoint(false)
    }
    setTimeout(() => renew(), 1500)
  }

  function validateImg(op, ind) {
    if (answeredIndex.value !== null) return
    answeredIndex.value = ind
    sysStore.addPoint(op.correct)
    setTimeout(() => renew(), 1500)
  }

  function imgOptionClass(op, ind) {
    if (answeredIndex.value === null) return 'border-transparent'
    if (op.correct) return 'border-green-500'
    if (ind === answeredIndex.value) return 'border-red-500'
    return 'border-transparent'
  }

  renew()
  points.value = [0, 0]
</script>

<style scoped>
  .options {
    @apply flex flex-col lg:flex-row justify-evenly w-2/3 mx-auto lg:space-x-4;
  }
  .img-options {
    @apply grid grid-cols-2 gap-3 w-2/3 mx-auto;
  }
  .img-option {
    @apply aspect-square w-full;
  }
</style>
