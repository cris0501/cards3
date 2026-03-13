import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  const isLoading = ref(false);
  const record = ref(0);
  const points = ref([0,0]);
  const loadedFiles = ref([]);
  const darkMode = ref(false);
  
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
    darkMode.value = localStorage.getItem('darkMode') === 'true'
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    }
  }

  function toggleDarkMode (){
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value)
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    record,
    points,
    addPoint,
    load,
    toggleDarkMode,
    darkMode,
    isLoading,
    loading,
    loadedFiles
  }
})

