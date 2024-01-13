<template>
  <loading />
  <picture class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none h-screen" style="position:absolute;" draggable="false">
    <source srcset="/images/bg.avif" type="image/avif">
    <img src="/images/bg.png" alt="" class="w-[90rem] flex-none max-w-none" decoding="async">
  </picture>

  <header>
    <router-link :to="{name: 'home'}">
      <i class="icon icon-home"></i><p class="hidden md:inline"> Inicio </p>
    </router-link>
    <i class="icon icon-plus rounded-full text-center py-2 text-xs text-sky-400 font-bold bg-sky-400/[0.1] cursor-pointer px-4" @click="toggleShowAdd"></i>
    <router-link :to="{name: 'config'}">
      <i class="icon icon-config"></i><p class="hidden md:inline"> Configuración </p>
    </router-link>
  </header>

  <RouterView class="pt-20"/>

  <Add v-show="showAdd" @close="toggleShowAdd"/>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useWordsStore } from '@/stores/words'
  import loading from '@/components/Load.vue'
  import Add from '@/components/Add.vue'

  const showAdd = ref(false)

  function toggleShowAdd (){
    showAdd.value = !showAdd.value
  }
</script>

<style scoped>
header {
  @apply flex items-center justify-around bg-slate-900/75 fixed z-20 top-0 left-0 w-full text-sm text-white px-5 md:px-10 py-3 border-b border-slate-900/[0.1];
  backdrop-filter: blur(5px);
}
  header a {
    @apply w-1/3 md:w-1/4 rounded-full text-center py-2 text-xs font-bold bg-sky-400/[0.1] cursor-pointer;
  }
   header p {
    @apply text-sky-400;
  }

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
