import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
   Home: undefined
   Profile: undefined
}
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   T
>
