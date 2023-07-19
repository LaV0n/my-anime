import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/profileReducer'

export const MyList = () => {
   const myList = useAppSelector(state => state.profile.animeList)
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)

   useEffect(() => {
      dispatch(getMyAnimeList())
   }, [uid])

   return (
      <View>
         {myList.length === 0 && <Text>empty list</Text>}
         <View>
            {myList.map(l => (
               <View key={l.animeId}>
                  <Text>name: {l.title}</Text>
                  <Text>status: {l.status}</Text>
                  <Text>rating: {l.rating}</Text>
               </View>
            ))}
         </View>
      </View>
   )
}
