export function encodeCategory(categoryName, cardsArray) {
  const stripped = cardsArray.map(card => {
    const out = {}
    for (const f of ['side_1','info_1','img_1','sound_1','side_2','info_2','img_2','sound_2']) {
      if (card[f]) out[f] = card[f]
    }
    return out
  })
  const payload = { category: categoryName, cards: stripped }
  return encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(payload))))
}

export function decodeCategory(encoded) {
  try {
    const payload = JSON.parse(decodeURIComponent(atob(decodeURIComponent(encoded))))
    if (!payload.category || !Array.isArray(payload.cards)) return null
    return payload
  } catch { return null }
}
