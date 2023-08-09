import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList, getSearchAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { ErrorMessage } from '../components/ErrorMessage'
import { SearchBlock } from '../components/SearchBlock'
import { RootTabScreenProps } from '../common/types'
import { useTheme } from '@rneui/themed'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { Ranking } from '../common/variables'

export const Search = (navigator: RootTabScreenProps<'Search'>) => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()
   const [lastRequest, setLastRequest] = useState<string>()
   const { theme } = useTheme()

   const goHomeLink = () => {
      navigator.navigation.navigate('Home')
   }
   const goFilterLink = () => {
      navigator.navigation.navigate('Filter')
   }
   const getAnime = () => {
      lastRequest ? dispatch(getSearchAnimeList(lastRequest)) : dispatch(getAnimeList(Ranking.ALL))
   }
   useEffect(() => {
      getAnime()
   }, [myAnimeList])

   if (statusApp === 'loading') {
      return <LoadingIndicator />
   }

   return (
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
         <ErrorMessage />
         <SearchBlock
            setLastRequest={setLastRequest}
            goHomeLink={goHomeLink}
            goFilterLink={goFilterLink}
         />
         <View>
            {animeList.length === 0 && (
               <Text style={{ color: theme.colors.primary }}>Empty list</Text>
            )}
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} navigator={navigator} />
            ))}
         </View>
      </ScrollView>
   )
}
