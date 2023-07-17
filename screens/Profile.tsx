import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/profileReducer'

export const Profile = () => {
   const myList = useAppSelector(state => state.profile.animeList)
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getMyAnimeList())
   }, [dispatch])

   return (
      <View>
         <Text>profile</Text>
         <View>
            {myList.map(l => (
               <View key={l.id}>
                  <Text>name: {l.title}</Text>
                  <Text>status: {l.status}</Text>
                  <Text>rating: {l.rating}</Text>
               </View>
            ))}
         </View>
      </View>
   )
}
