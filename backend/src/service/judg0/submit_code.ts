import axios from 'axios'

export default function submitCode (): void {
  axios.post('/judg0', {
    a: '阿拉花瓜'
  })
    .then((response) => { console.log(response) })
    .catch((error) => { console.log(error) })
}

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions',
  params: { base64_encoded: 'false', wait: 'true', fields: '*' },
  headers: {
    'content-type': 'application/json',
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'c36f88b7aemsh6a6449cd71cbce0p1a11d5jsn339bbaa18aa6',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  },
  data: '{"language_id":63,"source_code":"const a=123console.log(a)"}'
}

axios.request(options).then(function (response) {
  console.log(response.data)
}).catch(function (error) {
  console.error(error)
})
