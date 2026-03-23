<template>
  <div class="flex flex-col p-8">

    <div v-if="state === 'loading'" class="flex flex-col items-center justify-center mt-20 space-y-4 text-gray-400">
      <i class="icon icon-spinner loading text-4xl"></i>
      <p>Cargando stack...</p>
    </div>

    <div v-else-if="state === 'confirm'" class="flex flex-col space-y-6">
      <div>
        <p class="text-2xl font-bold dark:text-white">Importar stack</p>
        <p class="text-gray-500 dark:text-slate-400">Revisá los datos antes de cargar</p>
      </div>

      <div class="border rounded-xl p-5 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm space-y-2">
        <p class="text-lg font-bold dark:text-white">{{ preview.category }}</p>
        <p class="text-gray-500 dark:text-slate-400 text-sm">{{ preview.cards.length }} tarjetas</p>
        <p v-if="alreadyLoaded" class="text-yellow-600 dark:text-yellow-400 text-sm font-semibold">
          ⚠ Esta categoría ya existe — se agregarán las tarjetas igualmente
        </p>
      </div>

      <div class="flex space-x-3">
        <button
          class="flex-1 py-2 rounded-full bg-rose-200 text-rose-700 font-semibold"
          @click="confirmLoad">
          Cargar
        </button>
        <button
          class="flex-1 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold"
          @click="router.push('/repo')">
          Cancelar
        </button>
      </div>
    </div>

    <div v-else-if="state === 'error'" class="flex flex-col items-center justify-center mt-20 space-y-4 text-center">
      <p class="text-2xl">⚠</p>
      <p class="font-bold text-lg dark:text-white">No se pudo cargar el stack</p>
      <p class="text-gray-500 dark:text-slate-400 text-sm">{{ errorMsg }}</p>
      <button
        class="mt-4 px-6 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold"
        @click="router.push('/repo')">
        Ir al repositorio
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWordsStore } from '@/stores/words'

const router = useRouter()
const route = useRoute()
const wordsStore = useWordsStore()

const state = ref('loading') // 'loading' | 'confirm' | 'error'
const preview = ref(null)
const errorMsg = ref('')

const alreadyLoaded = computed(() =>
  preview.value ? preview.value.category in wordsStore.categories : false
)

onMounted(async () => {
  const srcParam = route.query.src
  if (!srcParam) {
    errorMsg.value = 'No se proporcionó una URL de origen.'
    state.value = 'error'
    return
  }

  let url
  try {
    url = atob(srcParam)
  } catch {
    errorMsg.value = 'El parámetro src no es base64 válido.'
    state.value = 'error'
    return
  }

  let data
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data = await res.json()
  } catch (e) {
    errorMsg.value = `No se pudo obtener el JSON: ${e.message}`
    state.value = 'error'
    return
  }

  if (!data.category || !Array.isArray(data.cards) || data.cards.length === 0) {
    errorMsg.value = 'El JSON no tiene el formato esperado (category + cards[]).'
    state.value = 'error'
    return
  }

  preview.value = data
  state.value = 'confirm'
})

function confirmLoad() {
  preview.value.cards.forEach((card) => {
    wordsStore.addWord({ ...card, category: preview.value.category })
  })
  router.push('/repo')
}
</script>

<style scoped>
.loading {
  width: 36px;
  height: 36px;
  animation: load 1s linear infinite;
}
@keyframes load {
  from { transform: rotate(0deg); }
  to   { transform: rotate(359deg); }
}
</style>
