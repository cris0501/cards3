function time(ms){
  return new Promise(resolve => setTimeout(resolve, ms) )
}

self.addEventListener ('message', async (event) => {
  const data = {
    status: 'Actualizando',
    show: true
  }

  postMessage(data)

  await time(3500)
  data.status = 'Limpiando'
  postMessage(data)

  await time(3500)
  data.show = false
  postMessage(data)

  self.close()
})
