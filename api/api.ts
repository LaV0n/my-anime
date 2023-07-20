import axios from 'axios'
import { MY_API_KEY } from '@env'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
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
      return instance.get('v2/anime/ranking?ranking_type=all&limit=4', anonymousParams)
   },
   getTitleShortInfo(id: string) {
      return instance.get(
         `v2/anime/${id}?fields=start_date,end_date,mean,status,genres,num_episodes`,
         anonymousParams
      )
   },
   getMyList(userId: string) {
      const usersColl = collection(db, 'users/' + userId + '/list')
      return getDocs(usersColl)
   },
   delMyItem(id: string, userId: string) {
      const item = doc(db, 'users/' + userId + '/list', id)
      return deleteDoc(item)
   },
}
