import axios from 'axios'
import { MY_API_KEY } from '@env'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const instance = axios.create({
   baseURL: 'https://api.myanimelist.net',
})
const anonymousParams = {
   headers: {
      'X-MAL-CLIENT-ID': MY_API_KEY,
   },
}
export const MyAnimeListAPI = {
   getAllAnime() {
      return instance.get('v2/anime/season/2023/summer?limit=4', anonymousParams)
   },
   getMyList(userId: string) {
      const usersColl = collection(db, 'users/' + userId + '/list')
      return getDocs(usersColl)
   },
}
