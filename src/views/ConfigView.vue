<template>
  <div class="flex flex-col w-full h-full p-8">

    <!-- <div class="flex flex-col items-center">
      <p class="text-2xl font-bold mb-5"> Palabras </p>
      <input type="file" class="hidden" id="file" ref="fileInput" @change="readFil">
      <label for="file" class="file"> Selecciona archivo </label>
      <btnComponent color="green">
        Guardar
        <template #icon>
          <i class="icon icon-download"></i>
        </template>
      </btnComponent>
    </div> -->

    <p class="text-2xl font-bold mb-6">Categorias</p>

    <div class="flex flex-col space-y-3 w-7/8 lg:w-2/3 mx-auto">

      <!-- Boton de importar - siempre arriba del todo -->
      <div class="border rounded-xl overflow-hidden shadow-sm bg-white">
        <input type="file" accept=".json,application/json" class="hidden" ref="importInput" @change="importFile">
        <button
          class="w-full flex items-center justify-center space-x-2 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          @click="importInput.click()">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>+ Importar categoria</span>
        </button>
        <!-- Mensaje de resultado tras importar -->
        <p v-if="importMsg" class="text-center text-sm py-2"
          :class="importMsg.ok ? 'text-green-600' : 'text-red-500'">
          {{ importMsg.text }}
        </p>
      </div>

      <!-- Una tarjeta por categoria con botones compartir y eliminar -->
      <div v-for="cat in categoryNames" :key="cat"
        class="border rounded-xl overflow-hidden shadow-sm bg-white">
        <div class="grid grid-cols-2">
          <p class="col-span-2 font-bold text-lg px-4 py-3 border-b">{{ cat }}</p>

          <!-- Boton compartir - exporta la categoria como fichero JSON -->
          <button
            class="flex items-center justify-center space-x-2 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold border-r"
            @click="shareCategory(cat)">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span>Compartir</span>
          </button>

          <!-- Boton eliminar categoria -->
          <button
            class="flex items-center justify-center space-x-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold"
            @click="deleteCategory(cat)">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            <span>Eliminar</span>
          </button>
        </div>
      </div>

    </div>

    <p class="mt-auto pt-10 text-sm text-gray-400">By C. Ramirez</p>

  </div>
</template>

<script setup>
  // ConfigView.vue
  // - shareCategory: exporta la categoria a un fichero JSON con imagenes en base64
  // - importFile: lee un fichero JSON, guarda imagenes en IndexedDB e importa las tarjetas

  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import { isLocalImage, imageToBase64, base64ToImage } from '@/utils/imageStore'

  const wordsStore = useWordsStore()
  const { categories } = storeToRefs(wordsStore)

  const importInput = ref(null)
  const importMsg = ref(null)

  const categoryNames = computed(() => Object.keys(categories.value))

  function deleteCategory(category) {
    wordsStore.deleteCategory(category)
  }

  // -- Exportar --

  async function shareCategory(categoryName) {
    const cards = wordsStore.categories[categoryName]

    const resolved = await Promise.all(cards.map(async (card) => {
      const out = {}
      for (const f of ['side_1', 'info_1', 'img_1', 'sound_1', 'side_2', 'info_2', 'img_2', 'sound_2']) {
        if (!card[f]) continue
        if ((f === 'img_1' || f === 'img_2') && isLocalImage(card[f])) {
          out[f] = await imageToBase64(card[f])
        } else {
          out[f] = card[f]
        }
      }
      return out
    }))

    const payload = JSON.stringify({ category: categoryName, cards: resolved })
    const file = new File([payload], categoryName + '.json', { type: 'application/json' })

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: categoryName }).catch(() => {})
    } else {
      downloadFile(file)
    }
  }

  function downloadFile(file) {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  // -- Importar --

  function importFile(event) {
    const file = event.target.files[0]
    if (!file) return
    importMsg.value = null

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (!data.category || !Array.isArray(data.cards)) throw new Error()

        for (const card of data.cards) {
          const resolved = { ...card }
          if (resolved.img_1?.startsWith('data:')) resolved.img_1 = await base64ToImage(resolved.img_1)
          if (resolved.img_2?.startsWith('data:')) resolved.img_2 = await base64ToImage(resolved.img_2)
          wordsStore.addWord({ ...resolved, category: data.category })
        }

        importMsg.value = { ok: true, text: 'Importado: ' + data.category + ' (' + data.cards.length + ' tarjetas)' }
      } catch {
        importMsg.value = { ok: false, text: 'Fichero invalido o daniado.' }
      }
      // Resetear el input para poder reimportar el mismo fichero si hace falta
      importInput.value.value = ''
    }
    reader.readAsText(file)
  }

  // -- Funciones comentadas (carga por CSV) --
  // function addWord(_word) { ... }
  // function readFil() { ... }
</script>

<style scoped>
  .file {
    @apply border-b-2 border-gray-800 px-5 cursor-pointer;
  }
</style>
