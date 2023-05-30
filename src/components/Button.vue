<template>
  <div :class="propBG" class="flex items-center justify-between rounded-lg px-4 py-2">
    <div class="flex justify-center items-center text-center">
      <p :class="propText"> <slot name="text"></slot> </p>
    </div>
    <div :class="propIcon" class="flex justify-center items-center">
      <slot name="icon">
      </slot>
    </div>
  </div>
</template>

<script>
  import { onMounted, computed } from 'vue'

  export default {
    props: {
      color: {
        type: String,
        default: 'green',
      }
    },
    setup (props){
      const propBG = computed(() => `bg-${props.color}-500`);
      const propText = computed(() => `text-${props.color}-200`);
      const propIcon = computed(() => `bg-${props.color}-800`);

      return {
        propBG, propText, propIcon,
      }
    }
  }
</script>

<style>
</style>
