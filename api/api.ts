import axios from 'axios'
import { MY_API_KEY } from '@env'

const instance = axios.create({
   baseURL: 'https://api.myanimelist.net/v2',
   headers: {
      'X-MAL-CLIENT-ID': MY_API_KEY,
   },
})

export const MyAnimeListAPI = {
   getAllAnime() {
      return instance.get('/anime?q=one&limit=4')
   },
}
