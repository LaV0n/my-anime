import axios from 'axios'
import { MY_API_KEY } from '@env'
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AnimeType } from '../common/types'

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
      return instance.get('v2/anime/ranking?ranking_type=all', anonymousParams)
   },
   getTitleShortInfo(id: string) {
      return instance.get(
         `v2/anime/${id}?fields=start_date,end_date,mean,status,genres,num_episodes`,
         anonymousParams
      )
   },
   getSearchAnime(anime: string) {
      return instance.get(`v2/anime?q=${anime}`, anonymousParams)
   },
   getMyList(userId: string) {
      const usersColl = collection(db, 'users/' + userId + '/list')
      return getDocs(usersColl)
   },
   delMyItem(id: string, userId: string) {
      const item = doc(db, 'users/' + userId + '/list', id)
      return deleteDoc(item)
   },
   addItemToMyList(userId: string, animeItem: AnimeType) {
      return addDoc(collection(db, 'users/' + userId + '/list'), animeItem)
   },
   changeItemData(userId: string, dataId: string, data: string | number) {
      const animeItem = doc(db, 'users/' + userId + '/list', dataId)
      const requestData = typeof data === 'number' ? { myRating: data } : { myStatus: data }
      return updateDoc(animeItem, requestData)
   },
}
