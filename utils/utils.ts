import { AnimeType, FilterDataType } from '../common/types'

export const statusAnimeItem = (status: string | undefined) => {
   return status === 'finished_airing' ? 'finished' : 'currently'
}
export const stringToDateTime = (s: string) => {
   return new Date(s).getTime()
}
export const toLowCaseString = (s: string) => {
   return s.toLowerCase().replace(/\s/g, '')
}
export const filterAnimeListData = (animeList: AnimeType[], filter: FilterDataType) => {
   let result: AnimeType[] = []
   if (filter.sortByRating === 'rating') {
      result = animeList.sort((a, b) => b.mean - a.mean)
   }
   if (filter.sortByRating === 'newest') {
      result = animeList.sort(
         (a, b) => stringToDateTime(b.start_date) - stringToDateTime(a.start_date)
      )
   }
   if (filter.releaseFilter !== 'all') {
      result = result.filter(a => a.start_date && a.start_date.slice(0, 4) === filter.releaseFilter)
   }
   if (filter.genre[0] !== 'all') {
      for (let i = 0; i < filter.genre.length; i++) {
         result = result.filter(a =>
            a.genres.some(w => toLowCaseString(w.name) === filter.genre[i])
         )
      }
   }
   if (filter.myStars && filter.myStatus) {
      if (filter.myStatus !== 'all') {
         result = result.filter(a => a.myStatus === filter.myStatus)
      }
      if (filter.myStars !== '0') {
         result = result.filter(a => a.myRating.toString() === filter.myStars)
      }
   }

   return result
}
