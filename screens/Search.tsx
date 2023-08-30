import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
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
import { useIsFocused } from '@react-navigation/native'
import { PagesBlock } from '../components/PagesBlock'
import { changeFilterScreen } from '../bll/appReducer'

export const Search = (navigator: RootTabScreenProps<'Search'>) => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const dispatch = useAppDispatch()
   const lastRequest = useAppSelector(state => state.animeList.lastRequest)
   const filterScreen = useAppSelector(state => state.app.filterScreen)
   const currentPage = useAppSelector(state => state.animeList.currentPage)
   const isFocused = useIsFocused()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const goHomeLink = () => {
      navigator.navigation.navigate('Home')
   }
   const goFilterLink = () => {
      navigator.navigation.navigate('Filter')
      dispatch(changeFilterScreen('search'))
   }
   const getAnime = () => {
      lastRequest ? dispatch(getSearchAnimeList(lastRequest)) : dispatch(getAnimeList(Ranking.ALL))
   }

   useEffect(() => {
      if (isFocused && filterScreen === 'search') {
         getAnime()
      }
   }, [myAnimeList, isFocused, currentPage])

   return (
      <View style={styles.container}>
         <LoadingIndicator />
         <ErrorMessage />
         <SearchBlock goHomeLink={goHomeLink} goFilterLink={goFilterLink} filterScreen={'search'} />
         <ScrollView>
            {animeList.length === 0 ? (
               <NotFound />
            ) : (
               <>
                  {animeList.map(a => (
                     <AnimeItemShort anime={a} key={a.id} navigator={navigator} />
                  ))}
                  <PagesBlock />
               </>
            )}
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
