import {
   AnimeType,
   BackLinkType,
   CurrentAnimeType,
   FilterDataType,
   PictureSourceType,
   SeasonKindType,
   SeasonType,
} from '../common/types'
import { defaultImg } from '../common/variables'

export const statusAnimeItem = (status: string | undefined) => {
   let result = 'currently'
   if (status === 'finished_airing') result = 'finished'
   if (status === 'not_yet_aired') result = 'not yet aired'
   return result
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
   if (filter.mediaType !== 'unknown') {
      result = result.filter(a => a.media_type === filter.mediaType)
   }

   return result
}

export const checkingImg = (animeData: AnimeType[] | CurrentAnimeType) => {
   const noPic: PictureSourceType = {
      medium: defaultImg.noImg,
      large: defaultImg.noImg,
   }
   if (Array.isArray(animeData)) {
      return animeData.map(a => (a.main_picture ? a : { ...a, main_picture: noPic }))
   } else {
      return animeData.main_picture ? animeData : { ...animeData, main_picture: noPic }
   }
}

export const seasonKind = ({ type }: SeasonKindType): SeasonType => {
   let date = new Date().getMonth()
   if (type === 'next') date += 3
   if (type === 'prev') date -= 3
   switch (date) {
      case 0:
      case 1:
      case 11:
      case 12:
      case 13:
      case -1:
         return 'winter'
      case 2:
      case 3:
      case 4:
         return 'spring'
      case 5:
      case 6:
      case 7:
         return 'summer'
      case 8 | 9 | 10 | -2 | -3:
      case 9:
      case 10:
      case -2:
      case -3:
         return 'fall'
      default:
         return 'spring'
   }
}
export const chooseBackLink = ({
   backLinkSteps,
   navigation,
   delLastLink,
   getLastAnime,
}: BackLinkType) => {
   const lastStep = backLinkSteps[backLinkSteps.length - 1]
   delLastLink()
   if (
      lastStep === 'Search' ||
      lastStep === 'MyList' ||
      lastStep === 'Seasonal' ||
      lastStep === 'Home'
   ) {
      return navigation.navigation.navigate(lastStep)
   } else {
      return getLastAnime ? getLastAnime(lastStep) : undefined
   }
}

export const titleNameSelector = (anime: AnimeType) => {
   if (anime.alternative_titles && anime.alternative_titles.en) return anime.alternative_titles.en
   else {
      return anime.title
   }
}
