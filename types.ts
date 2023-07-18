import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
   Home: undefined
   Profile: undefined
   Login: undefined
   SignUp: undefined
}
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   T
>

type AnimeStatusType = 'watched' | 'unwatch' | 'dropped' | 'toWatch'
export type AnimeListType = {
   animeId: string
   title: string
   status: AnimeStatusType
   rating: number
}
export type ProfileType = {
   animeList: AnimeListType[]
}
export type AnimeType = {
   id: string
   title: string
   picture: string
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
