<script>
  import btn from '../components/Button.vue'

  export default {
    name: 'ConfigView',
    components: {
      btn
    }
  }
</script>

<template>
  <div class="flex justify-evenly items-center flex-wrap w-full h-screen p-8 mt-12">
    <div class="flex flex-col items-center">
      <p class="text-2xl mb-8 font-bold"> Palabras </p>
      <input type="file" class="hidden" id="file">
      <label for="file" class="file"> Cargar archivo </label>

      <btn color="sky">
        <template v-slot:text>
          Prueba de btn
        </template>
        <template #icon>
          <i class="icon icon-ok"></i>
        </template>
      </btn>
    </div>
  </div>
</template>

<style scoped>
  .file {
    @apply border-b-2 border-white p-3 px-5 text-white cursor-pointer;
  }
</style>
