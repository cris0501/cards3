<template>
  <div class="flex flex-col items-center justify-center self-center w-full h-view relative">
    <div class="flex items-center justify-evenly w-full fixed bottom-[90px]">
      <p> <i class="text-green-500 icon icon-ok"></i> {{ points[0] }} </p>
      <p> <i class="text-blue-500 icon icon-info"></i> {{ points[1] }} </p>
      <p> <i class="text-yellow-500 icon icon-minus"></i> {{ record }} </p>
    </div>

    <p class="font-bold text-xl mb-8"> ¿Que se muestra en la imagen? </p>

    <div class="w-5/6 px-3 py-1">
      <div class="mx-auto border-dashed border-2">
      </div>
    </div>

    <div class="flex flex-col items-center max-h-[25%] my-4">
      <img :src="showWords[word].img_2" alt="Imagen" class="max-h-[75%]" draggable="false" />
      <!--<p class="font-bold text-lg my-4"> {{ showWords[word].side_2 }} </p>-->
    </div>
    <div class="options" ref="opt">
      <btn color="blue" class="flex-1" v-for="(op,ind) in options" :key="'btn-op-'+ind" @click="validate(op.value, $event)">
        {{ op.text }}
      </btn>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useWordsStore } from '@/stores/words'
  import { useSysStore } from '@/stores/system'
  import btn from '@/components/Button.vue'

  const wordsStore = useWordsStore()
  const { showWords } = storeToRefs(wordsStore)

  const sysStore = useSysStore()
  const { points, record } = storeToRefs(sysStore)

  const word = ref(0) // Index of current word
  const options = ref([]) // Value to options
  const indexes = ref([]) // Index to ignore
  const opt = ref(null)

  function renew (){
    if (opt.value){
      Array.from(opt.value.children).forEach( div => {
        div.classList.remove('bg-green-500')
        div.classList.remove('bg-red-500')
        div.classList.add('bg-blue-500')
      })
    }

    options.value = []
    indexes.value = []

    word.value = Math.floor(Math.random() * showWords.value.length)
    options.value.push({
      text: showWords.value[word.value].side_2,
      value: word.value
    })
    indexes.value.push(word.value)

    while (options.value.length < 4 && indexes.value.length < showWords.value.length){
      let index = null
      while (true){
         index = Math.floor(Math.random() * showWords.value.length)
         if (!indexes.value.includes(index)) break
      }
      indexes.value.push(index)
      options.value.push({
        text: showWords.value[index].side_2,
        value: index
      })
    }

    options.value = options.value.sort( () => Math.random() - 0.5)
  }

  function validate (index, event){
    event.currentTarget.classList.remove('bg-blue-500')
    if (index == word.value){
      event.currentTarget.classList.add('bg-green-500')
      sysStore.addPoint(true)
    }
    else {
      event.currentTarget.classList.add('bg-red-500')
      sysStore.addPoint(false)
    }

    setTimeout( () => {
      renew()
    }, 1500)
  }

  renew()
  points.value = [0, 0]
</script>

<style scoped>
  .options {
    @apply flex flex-col lg:flex-row justify-evenly w-2/3 mx-auto lg:space-x-4;
  }
</style>
