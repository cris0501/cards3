import { useWordsStore } from '@/stores/words.js'

export default function (aux){
  const useWords = useWordsStore();

  const new_word = {
    side_1: aux.side_1,
    img_1: (aux.img_1) ? aux.img1 : null,
    sound_1: (aux.sound_1) ? aux.sound_1 : null,
    info_1: (aux.info_1) ? aux.info_1 : null,
    side_2: aux.side_2,
    img_2: (aux.img_2) ? aux.img_2 : null,
    sound_2: (aux.sound_2) ? aux.sound_2 : null,
    info_2: (aux.info_2) ? aux.info_2 : null,
    category: (aux.category) ? aux.category : ''
  }

  useWords.addWord(new_word);
  return true;
}

//export readFile = (file_) => {
//  if (file){
//    let words = [];
//    let categoriesList = [];
//    let categories = {};
//    let allLines = file.split(/\r\n|\n/); // Separa todo el archivo en filas
//    let headers = allLines[0].split('|'); // Separa las palabras de la cabecera
//    allLines.shift(); // Elimina la primer fila, las cabeceras
//    
//    allLines.forEach((line,index) => {
//        line = line.split('|');
//        if ( !categoriesList.includes(line[0]) ) categoriesList.push(line[0]);
//        categories.push(line[0]);
//        categories[line[0]].push(line); // Agrega a cada categoria toda la linea
//
//        // TODO: Salvar las lineas en los archivos
//        let aux = {};
//        for(let i=0; i<headers.length; i++){ // Para cada item en una linea asociado a una cabecera
//            aux[headers[i]] = line[i]; // Agrega a la lista la pareja 'cabecera':'palabra'
//        }
//        state.words.push(aux); // Guarda la lista de palabras
//        //if ( !state.categories.includes(line[0]) ) state.categories.push(line[0]); // Agrega la categoria de cada fila a la lista de categorias
//    });
//    //state.words.pop(); // Elimina la ultima entrada vacia
//    //state.categories.pop(); // Elimina la ultima entrada vacia
//    localStorage.setItem('words', JSON.stringify(state.words));
//    localStorage.setItem('categories', JSON.stringify(state.categories));
//  }
//  else {
//      state.words = JSON.parse( localStorage.getItem('words') ); 
//      state.categories = JSON.parse( localStorage.getItem('categories') ); 
//  }
//}
