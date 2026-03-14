<template>
  <div class="flex items-center justify-center fixed top-0 left-0 w-screen h-[100vh] bg-gray-800/80 z-30" @click="exit">
    <div class="flex flex-col justify-center items-center w-5/6 rounded-lg bg-slate-200 dark:bg-gray-800 px-4 py-6 space-y-5">
      <p class="text-lg font-bold dark:text-white"> Agregar palabra </p>
      <div class="flex flex-col lg:flex-row w-5/6 lg:space-x-5">

        <div class="flex flex-1 flex-col space-y-3 mt-4">
          <p class="font-bold dark:text-white"> Frontal </p>
          <input type="text" v-model="word.side_1" placeholder="Frontal" class="dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <input type="text" v-model="word.info_1" placeholder="Informacion" class="dark:bg-gray-700 dark:text-white dark:border-gray-600">

          <!-- Selector de imagen para la cara frontal -->
          <div class="flex flex-col space-y-1">
            <input type="file" accept="image/*" class="hidden" ref="fileImg1" @change="handleImg1">
            <button type="button" class="text-left text-sm px-2 py-1 rounded bg-white dark:bg-gray-600 dark:text-white border"
              @click="fileImg1.click()">
              {{ word.img_1 ? 'Cambiar imagen' : 'Agregar imagen' }}
            </button>
            <img v-if="img1Preview" :src="img1Preview" class="h-16 object-contain rounded">
          </div>

          <input type="text" v-model="word.sound_1" placeholder="Audio" class="dark:bg-gray-700 dark:text-white dark:border-gray-600">
        </div>

        <div class="flex flex-1 flex-col space-y-3 mt-4">
          <p class="text-right font-bold dark:text-white"> Trasera </p>
          <input type="text" v-model="word.side_2" placeholder="Trasera" class="dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <input type="text" v-model="word.info_2" placeholder="Informacion" class="dark:bg-gray-700 dark:text-white dark:border-gray-600">

          <!-- Selector de imagen para la cara trasera -->
          <div class="flex flex-col space-y-1">
            <input type="file" accept="image/*" class="hidden" ref="fileImg2" @change="handleImg2">
            <button type="button" class="text-left text-sm px-2 py-1 rounded bg-white dark:bg-gray-600 dark:text-white border"
              @click="fileImg2.click()">
              {{ word.img_2 ? 'Cambiar imagen' : 'Agregar imagen' }}
            </button>
            <img v-if="img2Preview" :src="img2Preview" class="h-16 object-contain rounded">
          </div>

          <input type="text" v-model="word.sound_2" placeholder="Audio" class="dark:bg-gray-700 dark:text-white dark:border-gray-600">
        </div>

      </div>
      <div class="flex w-5/6">
        <input type="text" v-model="word.category" placeholder="Categoria" class="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
      </div>
      <div class="flex flex-col md:flex-row items-center justify-center w-5/6 lg:w-1/2 space-x-0 md:space-x-5">
        <btnComponent color="green" class="w-2/3 md:w-1/3" @click="addWord">
          Guardar
        </btnComponent>
        <btnComponent color="red" class="w-2/3 md:w-1/3" @click="close">
          Cancelar
        </btnComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Add.vue
  // Los campos img_1 / img_2 guardan el ID de IndexedDB (via imageStore).
  // El preview usa un object URL temporal creado del archivo seleccionado.

  import { ref } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import btnComponent from '@/components/Button.vue'
  import { saveImage } from '@/utils/imageStore'

  const wordsStore = useWordsStore()

  const fileImg1 = ref(null)
  const fileImg2 = ref(null)
  const img1Preview = ref('')
  const img2Preview = ref('')

  const word = ref({
    side_1: '',
    img_1: '',
    sound_1: '',
    info_1: '',
    side_2: '',
    img_2: '',
    sound_2: '',
    info_2: '',
    category: ''
  })

  const emits = defineEmits(['close'])

  // Guarda el archivo en IndexedDB y genera un preview temporal
  async function handleImg1(event) {
    const file = event.target.files[0]
    if (!file) return
    img1Preview.value = URL.createObjectURL(file)
    word.value.img_1 = await saveImage(file)
  }

  async function handleImg2(event) {
    const file = event.target.files[0]
    if (!file) return
    img2Preview.value = URL.createObjectURL(file)
    word.value.img_2 = await saveImage(file)
  }

  function addWord() {
    if (!word.value.side_1) return
    if (!word.value.side_2) return
    wordsStore.addWord(word.value)
    close()
  }

  function reset() {
    word.value = {
      side_1: '', img_1: '', sound_1: '', info_1: '',
      side_2: '', img_2: '', sound_2: '', info_2: '',
      category: ''
    }
    img1Preview.value = ''
    img2Preview.value = ''
  }

  function close() {
    reset()
    emits('close')
  }

  function exit(e) {
    if (e.target === e.currentTarget) {
      reset()
      emits('close')
    }
  }
</script>

<style scoped>
  input[type="text"] {
    @apply px-2 py-1 rounded border dark:border-slate-600;
  }
</style>
