<template>
  <div class="flex flex-col p-8">
    <p class="text-2xl font-bold mb-1 dark:text-white">Repositorio</p>
    <p class="text-gray-500 mb-6 dark:text-slate-400">Colecciones listas para cargar</p>

    <div v-if="loading" class="text-center text-gray-400 mt-10">Cargando...</div>

    <div v-else class="flex flex-col space-y-4">
      <div v-for="col in collections" :key="col.id"
        class="border rounded-xl p-4 flex flex-col space-y-2 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
        <p class="font-bold text-lg dark:text-white">{{ col.name }}</p>
        <p class="text-sm text-gray-500 dark:text-slate-400">{{ col.description }}</p>
        <div class="flex space-x-2 pt-1">
          <button v-if="!(col.category in wordsStore.categories)"
            class="px-4 py-1 rounded-full text-sm bg-rose-200 text-rose-700 font-semibold"
            @click="loadCollection(col)">
            + Agregar
          </button>
          <span v-else class="text-green-600 dark:text-green-400 text-sm self-center font-semibold">
            ✓ Ya cargado — bórralo desde Ajustes
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWordsStore } from '@/stores/words'

const wordsStore = useWordsStore()
const collections = ref([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}repo/index.json`)
  collections.value = await res.json()
  loading.value = false
})

async function loadCollection(col) {
  const res = await fetch(`${import.meta.env.BASE_URL}repo/${col.file}`)
  const data = await res.json()
  data.cards.forEach((card) => {
    wordsStore.addWord({ ...card, category: data.category })
  })
}
</script>
