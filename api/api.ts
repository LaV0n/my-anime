import axios from 'axios'
import { MY_API_KEY } from '@env'

const instance = axios.create({
   baseURL: 'https://api.myanimelist.net',
})
const anonymousParams = {
   headers: {
      'X-MAL-CLIENT-ID': MY_API_KEY,
   },
}
const params = {
   response_type: 'code',
   client_id: '8f3093749e2db79864a2e0db737406f4',
   code_challenge:
      'GstSFF7vzP1KyGzjNCkk1iqlymewGstSFF7vzP1KyGzjNCkk1iqlymewstSFF7vzP1KyGzjNCkk1iqlymewGstSFF7vzP1KyGzjNCkk1iqlymew',
   redirect_uri: 'https://github.com/LaV0n',
}
export const MyAnimeListAPI = {
   getAllAnime() {
      return instance.get('v2/anime?q=one&limit=4', anonymousParams)
   },
   getAuthCode() {
      return axios.get(
         `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${MY_API_KEY}&code_challenge=${params.code_challenge}&redirect_uri=${params.redirect_uri}`
      )
   },
}
