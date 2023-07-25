import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList, getSearchAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { ErrorMessage } from '../components/ErrorMessage'
import { SearchBlock } from '../components/SearchBlock'
import { RootTabScreenProps } from '../common/types'

export const Search = ({ navigation }: RootTabScreenProps<'Search'>) => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()
   const [lastRequest, setLastRequest] = useState<string>()

   const goHomeLink = () => {
      navigation.navigate('Home')
   }
   const goFilterLink = () => {
      navigation.navigate('Filter')
   }
   const getAnime = () => {
      lastRequest ? dispatch(getSearchAnimeList(lastRequest)) : dispatch(getAnimeList())
   }
   useEffect(() => {
      getAnime()
   }, [myAnimeList])

   return (
      <ScrollView>
         <ErrorMessage />
         <SearchBlock
            setLastRequest={setLastRequest}
            goHomeLink={goHomeLink}
            goFilterLink={goFilterLink}
         />
         {statusApp === 'loading' && <ActivityIndicator size="large" />}
         <View>
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} />
            ))}
         </View>
      </ScrollView>
   )
}
