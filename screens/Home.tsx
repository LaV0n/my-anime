import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { ErrorMessage } from '../components/ErrorMessage'

export const Home = () => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()
   const getAnime = () => {
      dispatch(getAnimeList())
   }
   useEffect(() => {
      getAnime()
   }, [myAnimeList])

   return (
      <ScrollView>
         <ErrorMessage />
         {statusApp === 'loading' && <ActivityIndicator size="large" />}
         <View>
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} />
            ))}
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   list: {
      height: '100%',
   },
})
