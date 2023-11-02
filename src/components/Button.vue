<template>
  <div :class="propBG" class="btn flex items-center justify-between rounded-lg pl-4 my-2 cursor-pointer">
    <p class="w-full text-white text-center font-bold pr-4"> <slot name="text"></slot> </p>
    <div :class="propIcon" class="flex justify-center items-center rounded-r-lg" style="height: 40px;">
      <slot name="icon">
      </slot>
    </div>
  </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue'

    const props = defineProps({
      color: {
        type: String,
        default: 'green'
      }
    })
    const propBG = computed(() => `bg-${props.color}-500`);
    //const propText = computed(() => `text-${props.color}-200`);
    const propIcon = computed(() => `bg-${props.color}-800`);
</script>

<style>
</style>
