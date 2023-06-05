<template>
  <div class="flex justify-evenly items-center flex-wrap w-full h-screen p-8 mt-12">
    <div class="card">
      <div>
        <i class="icon icon-stack"></i> Individuales
      </div>
    </div>

    <div class="card">
      <div>
        <i class="icon icon-list"></i> Listado
      </div>
    </div>

    <div class="card">
      <div>
        <i class="icon icon-pencil"></i> Practica
      </div>
    </div>

    <div class="card" @click="sys.loading">
      <div>
        <i class="icon icon-pencil"></i> {{ words }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useSysStore } from '@/stores/system'

  const sys = useSysStore();
</script>

<style scoped>
  .card {
    @apply flex items-center justify-stretch w-1/2 h-1/3 p-3;
  }
    .card div {
      @apply flex items-center justify-center w-full h-full rounded-lg text-white text-center text-lg font-bold bg-slate-700/[0.4] cursor-pointer;
    }
</style>
