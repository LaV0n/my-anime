import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/profileReducer'
import { MyAnimeItem } from '../components/MyAnimeItem/MyAnimeItem'

export const MyList = () => {
   const myList = useAppSelector(state => state.profile.animeList)
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)

   useEffect(() => {
      dispatch(getMyAnimeList())
      dispatch(getMyAnimeList())
   }, [uid])

   return (
      <ScrollView>
         {myList.length === 0 && <Text>empty list</Text>}
         <View>
            {myList.map(a => (
               <MyAnimeItem anime={a} key={a.id} />
            ))}
         </View>
      </ScrollView>
   )
}
