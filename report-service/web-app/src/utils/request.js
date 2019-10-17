// polifill
import 'whatwg-fetch'

const {ENV} = process.env
const host = ENV === 'production' ? window.origin : 'http://localhost:3000'

function requestInterface(path, body) {
  const token = localStorage.getItem('token')

  return fetch(`${host}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}


export {
  requestInterface
}
