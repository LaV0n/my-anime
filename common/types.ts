import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootTabParamList = {
   Home: undefined
   Search: undefined
   Profile: undefined
   Login: undefined
   SignUp: undefined
   MyList: undefined
   Filter: undefined
}
export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
   RootTabParamList,
   T
>

type AnimeStatusType = 'watched' | 'unwatch' | 'dropped'
export type CommonListType = {
   homeAnimeList: AnimeType[]
}

export type MyDataType = {
   animeList: AnimeType[]
}
export type AnimeType = {
   id: string
   title: string
   main_picture: {
      medium: string
      large: string
   }
   start_date: string
   end_date: string
   mean: number
   status: string
   genres: { id: string | number; name: string }[]
   num_episodes: string | number
   myStatus: AnimeStatusType
   myRating: number
   idDoc: string
}
export type AnimeResponseType = {
   node: {
      id: string
      title: string
      main_picture: { large: string }
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
