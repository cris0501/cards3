<template>
  <div :class="propBG" class="btn flex items-center justify-between rounded-lg pl-4 my-2 cursor-pointer">
    <p class="w-full text-white text-center font-bold pr-4"> <slot name="text"></slot> </p>
    <div :class="propIcon" class="flex justify-center items-center rounded-r-lg" style="height: 40px;">
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
      //const propText = computed(() => `text-${props.color}-200`);
      const propIcon = computed(() => `bg-${props.color}-800`);

      return {
        propBG, propIcon, //propText,
      }
    }
  }
</script>

<style>
</style>
