import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList } from '../bll/animeListReducer'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { ErrorMessage } from '../components/ErrorMessage'
import { SearchBlock } from '../components/SearchBlock'

export const Home = () => {
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()
   const [lastRequest, setLastRequest] = useState<any>(JSON.stringify(getAnimeList()))
   const getAnime = () => {
      dispatch(getAnimeList())
   }
   useEffect(() => {
      getAnime()
      console.log(lastRequest)
   }, [myAnimeList])

   return (
      <ScrollView>
         <ErrorMessage />
         <SearchBlock setLastRequest={setLastRequest} />
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
