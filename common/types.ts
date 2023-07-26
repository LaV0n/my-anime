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
}
export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
   RootTabParamList,
   T
>

type AnimeStatusType = 'watched' | 'unwatch' | 'dropped'
export type CommonListType = {
   homeAnimeList: AnimeType[]
   currentAnimeItem: CurrentAnimeType | null
}

export type MyDataType = {
   animeList: AnimeType[]
}
type NameType = {
   id: string | number
   name: string
}
type PictureSourceType = {
   medium: string
   large: string
}
export type AnimeType = {
   id: string
   title: string
   main_picture: PictureSourceType
   start_date: string
   end_date: string
   mean: number
   status: string
   genres: NameType[]
   num_episodes: string | number
   myStatus: AnimeStatusType
   myRating: number
   idDoc: string
}
export interface CurrentAnimeType extends AnimeType {
   alternative_titles: {
      synonyms: string[]
      en: string
      ja: string
   }
   synopsis: string
   rank: number
   popularity: number
   media_type: string
   source: string
   rating: string
   pictures: PictureSourceType[]
   related_anime: AnimeResponseType[]
   recommendations: AnimeResponseType[]
   studios: NameType[]
   statistics: {
      status: {
         watching: string
         completed: string
         on_hold: string
         dropped: string
         plan_to_watch: string
      }
      num_list_users: number
   }
}
export type AnimeResponseType = {
   node: {
      id: string
      title: string
      main_picture: PictureSourceType
   }
}
export type AppStatusType = 'success' | 'loading' | 'error'
export type AppType = {
   appStatus: AppStatusType
   error: string
}
export type AuthType = {
   uid: string
   email: string
   name: string
}
export type SearchBlockType = {
   setLastRequest: (value: string) => void
   goHomeLink: () => void
   goFilterLink: () => void
}
