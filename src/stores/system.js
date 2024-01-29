import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  const isLoading = ref(false);
  const record = ref(0); //Correct
  const points = ref([0,0]); //Correct,all
  const loadedFiles = ref([]); // list of loaded files
  
  function loading(){
    isLoading.value = !isLoading.value;
  }

  function addPoint (correct){
    if (correct) points.value[0]++;
    points.value[1]++;

    if (points.value[0] > record.value){
      record.value = points.value[0];
      localStorage.setItem('record', record.value)
    }
  }

  function load (){
    record.value = parseInt( localStorage.record ? localStorage.getItem('record') : 0 )
  }

  return {
    record,
    points,
    addPoint,
    load,

    isLoading,
    loading,
    loadedFiles
  }
})

