import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  const isLoading = ref(false);
  const record = ref(0); //Correct
  const poins = ref([0,0]); //Correct,all
  const loadedFiles = ref([]); // list of loaded files
  
  function loading(){
    isLoading.value = !isLoading.value;
  }

  function addPoin (correct){
    if (correct) poins.value[0]++;
    poins.value[0]++;

    if (poins.value[0]>record.value[0]){
      records.valie[0] = poins.value[0];
    }
  }

  return {
    record,
    poins,
    isLoading,
    loading,
    loadedFiles
  }
})

