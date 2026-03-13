<template>
  <div class="flex flex-col p-8">
    <p class="text-2xl font-bold mb-1">Importar categoría</p>

    <div v-if="error" class="text-red-500 mt-6">
      Link inválido o dañado.
    </div>

    <div v-else-if="payload" class="flex flex-col space-y-4 mt-4">
      <div class="border rounded-xl p-4 flex flex-col space-y-2 bg-white shadow-sm">
        <p class="font-bold text-lg">{{ payload.category }}</p>
        <p class="text-sm text-gray-500">{{ payload.cards.length }} tarjetas</p>

        <div class="flex flex-col space-y-1 pt-1">
          <div v-for="(card, i) in preview" :key="i"
            class="text-sm text-gray-700 border-b last:border-0 py-1">
            {{ card.side_1 }} → {{ card.side_2 }}
          </div>
          <p v-if="payload.cards.length > 5" class="text-xs text-gray-400 pt-1">
            y {{ payload.cards.length - 5 }} más...
          </p>
        </div>

        <div class="flex space-x-2 pt-2">
          <button v-if="!alreadyExists"
            class="px-4 py-1 rounded-full text-sm bg-rose-200 text-rose-700 font-semibold"
            @click="doImport">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWordsStore } from '@/stores/words'
import { decodeCategory } from '@/utils/shareEncoding'

const route = useRoute()
const wordsStore = useWordsStore()

const payload = ref(null)
const error = ref(false)

onMounted(() => {
  const encoded = route.query.d
  if (!encoded) { error.value = true; return }
  const decoded = decodeCategory(encoded)
  if (!decoded) { error.value = true; return }
  payload.value = decoded
})

const alreadyExists = computed(() =>
  payload.value ? payload.value.category in wordsStore.categories : false
)

const preview = computed(() =>
  payload.value ? payload.value.cards.slice(0, 5) : []
)

function doImport() {
  payload.value.cards.forEach(card => {
    wordsStore.addWord({ ...card, category: payload.value.category })
  })
}
</script>
