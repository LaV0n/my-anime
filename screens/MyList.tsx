import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/profileReducer'
import { MyAnimeItem } from '../components/MyAnimeItem'
import { ErrorMessage } from '../components/ErrorMessage'

export const MyList = () => {
   const myList = useAppSelector(state => state.profile.animeList)
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)

   useEffect(() => {
      if (!uid) return
      dispatch(getMyAnimeList())
   }, [uid, myList])

   return (
      <ScrollView>
         <ErrorMessage />
         {myList.length === 0 && <Text>empty list</Text>}
         <View>
            {myList.map(a => (
               <MyAnimeItem anime={a} key={a.id} />
            ))}
         </View>
      </ScrollView>
   )
}
