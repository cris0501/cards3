<template>
  <div class="flex flex-col md:flex-row justify-evenly items-center flex-wrap w-full h-screen p-8">
    <div class="card">
      <router-link :to="{name: 'one'}">
        <i class="icon icon-stack"></i> Individuales
      </router-link>
    </div>

    <div class="card">
      <router-link :to="{name: 'list'}">
        <i class="icon icon-list"></i> Listado
      </router-link>
    </div>

    <div class="card">
      <router-link :to="{name: 'home'}">
        <i class="icon icon-pencil"></i> Practica
      </router-link>
    </div>

  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped>
  .card {
    @apply flex items-center justify-stretch w-full md:w-1/2 h-1/3 p-3;
  }
    .card a {
      @apply flex items-center justify-center w-full h-full rounded-lg text-white text-center text-lg font-bold bg-slate-700/[0.3] cursor-pointer;
    }
</style>
