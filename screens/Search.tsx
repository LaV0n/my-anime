import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getSearchAnimeList, setCurrentPage } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { ErrorMessage } from '../components/ErrorMessage'
import { SearchBlock } from '../components/SearchBlock'
import { RootTabScreenProps } from '../common/types'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { NotFound } from '../components/NotFound'
import { useIsFocused } from '@react-navigation/native'
import { PagesBlock } from '../components/PagesBlock'
import { changeFilterScreen } from '../bll/appReducer'
import ScrollViewOffset from 'react-native-scrollview-offset'

export const Search = (navigator: RootTabScreenProps<'Search'>) => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const dispatch = useAppDispatch()
   const lastRequest = useAppSelector(state => state.animeList.lastRequest)
   const currentPage = useAppSelector(state => state.animeList.currentPage)
   const pageSize = useAppSelector(state => state.animeList.pageSize)
   const [toTopScreenPosition, setToTopScreenPosition] = useState(true)
   const isFocused = useIsFocused()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const goFilterLink = () => {
      navigator.navigation.navigate('Filter')
      dispatch(changeFilterScreen('search'))
   }
   const getAnime = () => {
      lastRequest ? dispatch(getSearchAnimeList(lastRequest)) : dispatch(getSearchAnimeList())
   }

   useEffect(() => {
      if (isFocused) {
         getAnime()
      }
   }, [isFocused, myAnimeList, currentPage, pageSize])

   useEffect(() => {
      dispatch(setCurrentPage(0))
   }, [isFocused])

   useEffect(() => {
      setToTopScreenPosition(true)
      setTimeout(() => {
         setToTopScreenPosition(false)
      }, 2000)
   }, [isFocused, currentPage, pageSize])

   return (
      <View style={styles.container}>
         <LoadingIndicator />
         <ErrorMessage />
         <SearchBlock goFilterLink={goFilterLink} filterScreen={'search'} />
         <ScrollViewOffset
            contentOffset={toTopScreenPosition ? { x: 0, y: 0 } : undefined}
            style={{ height: '93%' }}
         >
            {animeList.length === 0 ? (
               <NotFound />
            ) : (
               <>
                  {animeList.map(a => (
                     <AnimeItemShort
                        anime={a}
                        key={a.id}
                        navigator={navigator}
                        backKey={'search'}
                     />
                  ))}
                  <PagesBlock />
               </>
            )}
         </ScrollViewOffset>
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
