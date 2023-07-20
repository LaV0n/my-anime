import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort/AnimeItemShort'

export const Home = () => {
   const animeList = useAppSelector(state => state.animeList)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const error = useAppSelector(state => state.app.error)
   const dispatch = useAppDispatch()
   const getAnime = () => {
      dispatch(getAnimeList())
   }

   useEffect(() => {
      getAnime()
   }, [dispatch])

   return (
      <ScrollView>
         {statusApp === 'loading' && <ActivityIndicator size="large" />}
         <View>
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} />
            ))}
         </View>
         {error && <Text>{error}</Text>}
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
