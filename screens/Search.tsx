import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList, getSearchAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { ErrorMessage } from '../components/ErrorMessage'
import { SearchBlock } from '../components/SearchBlock'
import { RootTabScreenProps } from '../common/types'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { Ranking } from '../common/variables'
import { NotFound } from '../components/NotFound'
import { toggleMyListFilterData } from '../bll/appReducer'

export const Search = (navigator: RootTabScreenProps<'Search'>) => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const dispatch = useAppDispatch()
   const [lastRequest, setLastRequest] = useState<string>()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const goHomeLink = () => {
      navigator.navigation.navigate('Home')
   }
   const goFilterLink = () => {
      dispatch(toggleMyListFilterData(false))
      navigator.navigation.navigate('Filter')
   }
   const getAnime = () => {
      console.log('tyt')
      lastRequest ? dispatch(getSearchAnimeList(lastRequest)) : dispatch(getAnimeList(Ranking.ALL))
   }
   useEffect(() => {
      getAnime()
   }, [myAnimeList])

   return (
      <View style={styles.container}>
         <LoadingIndicator />
         <ErrorMessage />
         <SearchBlock
            setLastRequest={setLastRequest}
            goHomeLink={goHomeLink}
            goFilterLink={goFilterLink}
         />
         <ScrollView>
            {animeList.length === 0 && <NotFound />}
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} navigator={navigator} />
            ))}
         </ScrollView>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         height: '100%',
         backgroundColor: colors.colors.background,
         paddingVertical: 10,
      },
   })
