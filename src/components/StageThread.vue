<template>
  <div class="flex items-center justify-end w-full fixed bottom-0 right-0 py-1">
    <p class="flex items-center font-bold">
      {{ props.status }}
    </p>
    <i class="flex items-center justify-center icon icon-spinner loading"></i>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'

  const props = defineProps(['status'])
</script>

<style scoped>
  .loading {
    width: 30px;
    height: 30px;
    animation-duration: 1s;
    animation-name: load;
    animation-iteration-count: infinite;
    @apply mx-4 my-1 p-0;
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
