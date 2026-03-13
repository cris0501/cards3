// imageStore.js
// Wrapper sobre IndexedDB (via idb) para guardar imagenes como Blobs.
// Los campos img_1 / img_2 de las tarjetas guardan el ID generado aqui
// en vez de una URL o base64.

import { openDB } from 'idb'

const DB_NAME = 'cards-images'
const STORE_NAME = 'images'
const DB_VERSION = 1

// Abre (o crea) la base de datos
function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME)
    }
  })
}

// Genera un ID unico para cada imagen
function makeId() {
  return 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)
}

// -- Operaciones CRUD --

// Guarda un Blob y devuelve el ID generado
export async function saveImage(blob) {
  const id = makeId()
  const db = await getDB()
  await db.put(STORE_NAME, blob, id)
  return id
}

// Recupera un Blob por su ID
export async function getImage(id) {
  const db = await getDB()
  return db.get(STORE_NAME, id)
}

// Elimina una imagen por su ID
export async function deleteImage(id) {
  const db = await getDB()
  return db.delete(STORE_NAME, id)
}

// -- Utilidades para export / import --

// Convierte una imagen local a base64 data URL (para exportar en JSON)
export async function imageToBase64(id) {
  const blob = await getImage(id)
  if (!blob) return ''
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

// Guarda una base64 data URL como Blob y devuelve el nuevo ID (para importar)
export async function base64ToImage(dataUrl) {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return saveImage(blob)
}

// Detecta si un valor es un ID local (no una URL ni vacio)
export function isLocalImage(value) {
  return typeof value === 'string' && value.startsWith('img_')
}
