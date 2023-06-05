<template>
  <div class="flex justify-center items-center w-screen h-[100vh] absolute top-0 left-0 bg-black/90 z-50" v-show="useSys.isLoading">
    <p class="flex items-center flex-col text-3xl">
      <i class="icon icon-spinner loading"></i>
      Cargando
    </p>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { useSysStore } from '@/stores/system.js'

  const useSys = useSysStore();
</script>

<style>
  .loading {
    width: 30px;
    height: 30px;
    animation-duration: 1s;
    animation-name: load;
    animation-iteration-count: infinite;
    @apply m-0 my-5 p-0;
  }
    .loading::before {
      @apply m-0 p-0;
    }

  @keyframes load {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }
</style>
