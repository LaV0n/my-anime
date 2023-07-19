import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort/AnimeItemShort'

export const Home = () => {
   const animeList = useAppSelector(state => state.animeList)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()
   const getAnime = () => {
      dispatch(getAnimeList())
   }

   if (statusApp === 'loading') {
      return <ActivityIndicator size="large" />
   }

   return (
      <ScrollView>
         <Text>list of anime</Text>

         <View>
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} />
            ))}
         </View>
         <Button title="get anime" onPress={getAnime} />
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   picture: {
      width: 100,
      height: 100,
   },
})
