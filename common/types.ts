import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootTabParamList = {
   Home: undefined
   Search: undefined
   Profile: undefined
   Login: undefined
   SignUp: undefined
   MyList: undefined
   Filter: undefined
   AnimeItem: undefined
   Seasonal: undefined
}
export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
   RootTabParamList,
   T
>

export type AnimeStatusType =
   | 'completed'
   | 'planned'
   | 'dropped'
   | 'watching'
   | 'waiting-for-next-season'
export type CommonListType = {
   homeAnimeList: AnimeType[]
   currentAnimeItem: CurrentAnimeType | null
   topAnimeList: AnimeResponseType[]
   newAnimeList: AnimeResponseType[]
   randomAnimeItem: AnimeType | null
   filterData: FilterDataType
   lastRequest: string
   currentPage: number
   pageSize: number
}

export type MyDataType = {
   animeList: AnimeType[]
   filterData: FilterDataType
}
export type NameType = {
   id: string | number
   name: string
}
export type PictureSourceType = {
   medium: string
   large: string
}
export type AnimeType = {
   id: string
   title: string
   alternative_titles?: {
      synonyms: string[]
      en: string
      ja: string
   }
   main_picture: PictureSourceType
   start_date: string
   mean: number
   status: string
   genres: NameType[]
   media_type: string
   num_episodes: string | number
   myStatus: AnimeStatusType
   myRating: number
   myProgress: number
   idDoc: string
}
export interface CurrentAnimeType extends AnimeType {
   synopsis: string
   rank: number
   popularity: number
   source: string
   rating: string
   pictures: PictureSourceType[]
   related_anime: AnimeResponseType[]
   recommendations: AnimeResponseType[]
   studios: NameType[]
   statistics: StatisticViewType
}
export type StatisticViewType = {
   status: {
      watching: string
      completed: string
      on_hold: string
      dropped: string
      plan_to_watch: string
   }
   num_list_users: number
}
export interface RelatedAnimeResponseType extends AnimeResponseType {
   relation_type_formatted: string
}
export type AnimeResponseType = {
   node: {
      id: string
      title: string
      alternative_titles: {
         synonyms: string[]
         en: string
         ja: string
      }
      main_picture: PictureSourceType
      start_date: string
      end_date: string
      media_type: string
      mean: number
      status: string
      genres: NameType[]
      num_episodes: string | number
   }
   relation_type_formatted?: string
}
export type AppStatusType = 'success' | 'loading' | 'error'
export type FilterScreenType = 'search' | 'myList' | 'season' | 'home'
export type AppType = {
   appStatus: AppStatusType
   error: string
   filterScreen: FilterScreenType
}
export type AuthType = {
   uid: string
   email: string
}
export type SearchBlockType = {
   goFilterLink: () => void
   filterScreen: FilterScreenType
}
export type CustomFlatListType = {
   name: string
   data: AnimeResponseType[] | PictureSourceType[] | RelatedAnimeResponseType[]
   isLinked: boolean
}
export type RatingStarsType = {
   id: string
   myRating: number
   selectedColor?: string
   currentAnimeId?: string
}
export type CustomSelectListType = {
   idDoc: string
   myStatus: AnimeStatusType
   isMyList: boolean
   currentAnimeId?: string
   totalSeries: string | number
}
export type FilterButtonType = {
   name: string
   filterData: string | string[]
   callback: (value: MediaTypes) => void
}
export type FilterDataType = {
   sortByRating: string
   category: string
   genre: string[]
   releaseFilter: string
   mediaType: MediaTypes
   myStatus?: string
   myStars?: string
}
export type MediaTypes = 'unknown' | 'tv' | 'ova' | 'movie' | 'special' | 'ona' | 'music' | string
export type UserDataType = AuthType & ProfileDataType
export type ColorModeType = 'dark' | 'light'
export type ProfileDataType = {
   name: string
   colorMode: ColorModeType
   profileImg: string
}
export type OverlayMessageType = {
   isOpen: boolean
   setIsOpen: (value: boolean) => void
   navigation?: RootTabScreenProps<'Profile'>
}
export type YearSelectType = {
   year: string
   callback: (value: string) => void
   isSeason?: boolean
}
export type ProgressLineType = {
   startValue: number
   maxValue: number
   idDoc: string
}
export type RequestItemType = 'myRating' | 'myStatus' | 'myProgress'
export type SeasonType = 'winter' | 'spring' | 'summer' | 'fall'
export type SeasonDateType = {
   year: string
   season: SeasonType
}
export type SeasonTabType = 'Last' | 'This Season' | 'Next' | 'Archive'
export type SeasonKindType = {
   type: 'current' | 'prev' | 'next'
}
