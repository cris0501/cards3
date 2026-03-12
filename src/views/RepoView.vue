<template>
  <div class="flex flex-col p-8">
    <p class="text-2xl font-bold mb-1">Repositorio</p>
    <p class="text-gray-500 mb-6">Colecciones listas para cargar</p>

    <div v-if="loading" class="text-center text-gray-400 mt-10">Cargando...</div>

    <div v-else class="flex flex-col space-y-4">
      <div v-for="col in collections" :key="col.id"
        class="border rounded-xl p-4 flex flex-col space-y-2 bg-white shadow-sm">
        <p class="font-bold text-lg">{{ col.name }}</p>
        <p class="text-sm text-gray-500">{{ col.description }}</p>
        <div class="flex space-x-2 pt-1">
          <button v-if="!isLoaded(col)"
            class="px-4 py-1 rounded-full text-sm bg-rose-200 text-rose-700 font-semibold"
            @click="loadCollection(col)">
            + Agregar
          </button>
          <span v-else class="text-green-600 text-sm self-center font-semibold">
            ✓ Ya cargado — bórralo desde Ajustes
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWordsStore } from '@/stores/words'

const wordsStore = useWordsStore()
const { categories } = storeToRefs(wordsStore)
const collections = ref([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch('/repo/index.json')
  collections.value = await res.json()
  loading.value = false
})

function isLoaded(col) {
  return Object.keys(categories.value).includes(col.category)
}

async function loadCollection(col) {
  const res = await fetch(`/repo/${col.file}`)
  const data = await res.json()
  data.cards.forEach((card) => {
    wordsStore.addWord({ ...card, category: data.category })
  })
}
</script>
