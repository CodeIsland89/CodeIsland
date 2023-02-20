import axios from 'axios'
import submitCode from '../service/judg0/submit_code'

axios.post('/routes', {

})
  .then((response) => { console.log(response) })
  .catch((error) => { console.log(error) })

submitCode()
