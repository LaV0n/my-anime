import { RootStackScreenProps } from '../types'
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getAnimeList } from '../bll/animeListReducer'

export const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
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
         <StatusBar style="auto" />
         <Button title="go to profile" onPress={() => navigation.navigate('Profile')} />
         <View>
            {animeList.map(a => (
               <View key={a.id}>
                  <Image source={{ uri: a.picture }} style={styles.picture} />
                  <Text>name: {a.title}</Text>
               </View>
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
