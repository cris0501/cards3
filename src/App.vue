<template>
  <loading />
  <stageStatus :status="statusThread" v-show="showStage"/>
  <add v-show="showAdd" @close="toggleShowAdd"/>

  <div class="flex flex-col w-full min-h-[100dvh] pb-[84px] lg:pb-0 pl-0 lg:pl-[100px]">
    <RouterView />
  </div>

  <footer>
    <nav>
      <router-link :to="{name: 'home'}">
        <div>
          <i class="icon icon-home"></i>
          <p class=""> Inicio </p>
        </div>
      </router-link>
      <div @click="toggleShowAdd">
        <div>
          <i class="icon icon-plus"></i>
          <p class=""> Agregar </p>
        </div>
      </div>
      <router-link :to="{name: 'config'}">
        <div>
          <i class="icon icon-config"></i>
          <p class=""> Ajustes </p>
        </div>
      </router-link>
    </nav>
  </footer>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useWordsStore } from '@/stores/words'
  import { useSysStore } from '@/stores/system'
  import loading from '@/components/Load.vue'
  import add from '@/components/Add.vue'
  import stageStatus from '@/components/StageThread.vue'

  const showAdd = ref(false)
  const showStage = ref(true)
  const statusThread = ref('')
  const w1 = new URL('/workers/updateWorker.js', import.meta.url)
  const worker = new Worker(w1)

  const wordsStore = useWordsStore()
  wordsStore.load()

  const sysStore = useSysStore()
  sysStore.load()

  worker.addEventListener('message', ({data}) => {
    showStage.value = data.show
    statusThread.value = data.status
  })
  worker.postMessage('init')

  function toggleShowAdd (){
    showAdd.value = !showAdd.value
  }
</script>

<style scoped>
   nav {
    @apply flex flex-none lg:flex-col w-full lg:w-[100px] fixed bottom-0 lg:top-0 left-0 items-center justify-evenly bg-[#F5E9FE] z-20 p-2 rounded-t-xl lg:rounded-t-none lg:rounded-r-xl overflow-hidden;
  }
     nav > a,
     nav > div {
      @apply flex flex-1 flex-col justify-center items-center cursor-pointer;
    }
     nav > a > div,
     nav > div > div{
      @apply flex flex-col items-center justify-center w-fit mx-auto p-2 space-y-3 rounded-xl; 
    }
     nav a,p,i {
      @apply flex-1 text-center font-bold text-[#584592];
    }

  a.router-link-exact-active > div {
    @apply bg-white hover:bg-none;
  }
</style>
