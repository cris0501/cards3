const shell = "shell-v1"
const staticCache = "static-v1"
const dinamycCache = "dynamic-v1"

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      return cache.addAll([
        ${shell}
      ])
    })
  )
})


