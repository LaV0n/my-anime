import { ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/profileReducer'

export const Profile = () => {
   const myList = useAppSelector(state => state.profile.animeList)
   const dispatch = useAppDispatch()
   const emailUser = useAppSelector(state => state.auth.email)
   const userName = useAppSelector(state => state.auth.name)
   const uid = useAppSelector(state => state.auth.uid)

   useEffect(() => {
      dispatch(getMyAnimeList())
   }, [dispatch])

   return (
      <ScrollView>
         <Text>email:{emailUser}</Text>
         <Text>name:{userName}</Text>
         <Text>uid:{uid}</Text>
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
      </ScrollView>
   )
}
